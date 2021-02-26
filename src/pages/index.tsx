import { GetServerSideProps } from 'next';

import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperiencBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { ChallengeBox } from '../components/ChallengeBox';

import styles from '../styles/pages/Home.module.css';
import Head from 'next/head';

import { CountdownPrivider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface IHomeProps {
	level: number;
	currentExperience: number;
	challengesCompleted: number;
}

export default function Home(props: IHomeProps) {
	console.log(props);

	return (
		<ChallengesProvider
			level={props.level}
			currentExperience={props.currentExperience}
			challengesCompleted={props.challengesCompleted}
		>
			<div className={styles.container}>
				<Head>
					<title>Início | Move.it</title>
				</Head>
				<ExperiencBar />

				<CountdownPrivider>
					<section>
						<div>
							<Profile />
							<CompletedChallenges />
							<Countdown />
						</div>
						<div>
							<ChallengeBox />
						</div>
					</section>
				</CountdownPrivider>
			</div>
		</ChallengesProvider>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

	return {
		props: {
			level: Number(level),
			currentExperience: Number(currentExperience),
			challengesCompleted: Number(challengesCompleted),
		},
	};
};
