import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface IChallengesProviderProps {
	children: ReactNode;
	level: number;
	currentExperience: number;
	challengesCompleted: number;
}

interface IChallenge {
	type: 'body' | 'eye';
	description: string;
	amount: number;
}

interface IChallengesContextData {
	level: number;
	currentExperience: number;
	challengesCompleted: number;
	experienceToNextLevel: number;
	levelUp: () => void;
	startNewChallenge: () => void;
	activeChallenge: IChallenge;
	resetChallenge: () => void;
	completeChallange: () => void;
	closeLevelUpModal: () => void;
}

export const ChallengesContext = createContext({} as IChallengesContextData);

export function ChallengesProvider({
	children,
	...rest
}: IChallengesProviderProps) {
	const [level, setLevel] = useState(rest.level ?? 1);
	const [currentExperience, setCurrentExperience] = useState(
		rest.currentExperience ?? 0
	);
	const [challengesCompleted, setChallengesCompleted] = useState(
		rest.challengesCompleted ?? 0
	);
	const [activeChallenge, setActiveChallenge] = useState(null);
	const [isLevelUpModalOpen, setIsLevelupModalOpen] = useState(false);

	const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

	useEffect(() => {
		Notification.requestPermission();
	}, []);

	useEffect(() => {
		Cookies.set('level', String(level));
		Cookies.set('currentExperience', String(currentExperience));
		Cookies.set('challengesCompleted', String(challengesCompleted));
	}, [level, currentExperience, challengesCompleted]);

	function levelUp() {
		setLevel(level + 1);
		setIsLevelupModalOpen(true);
	}

	function closeLevelUpModal() {
		setIsLevelupModalOpen(false);
	}

	function startNewChallenge() {
		const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
		const challenge = challenges[randomChallengeIndex];
		setActiveChallenge(challenge);

		new Audio('/notification.mp3').play();

		if (Notification.permission === 'granted') {
			new Notification('Novo desafio 🎉', {
				body: `Valendo ${challenge.amount}xp!`,
			});
		}
	}

	function resetChallenge() {
		setActiveChallenge(null);
	}

	function completeChallange() {
		if (!activeChallenge) return;

		const { amount } = activeChallenge;

		let finalExperience = currentExperience + amount;

		if (finalExperience >= experienceToNextLevel) {
			finalExperience = finalExperience - experienceToNextLevel;
			levelUp();
		}

		setCurrentExperience(finalExperience);
		setActiveChallenge(null);
		setChallengesCompleted(challengesCompleted + 1);
	}

	return (
		<ChallengesContext.Provider
			value={{
				level,
				levelUp,
				challengesCompleted,
				currentExperience,
				startNewChallenge,
				activeChallenge,
				resetChallenge,
				experienceToNextLevel,
				completeChallange,
				closeLevelUpModal,
			}}
		>
			{children}
			{isLevelUpModalOpen && <LevelUpModal />}
		</ChallengesContext.Provider>
	);
}
