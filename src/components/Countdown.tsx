import styles from '../styles/components/Countdown.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCheckCircle,
	faChevronCircleRight,
	faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

import { useContext } from 'react';

import { CountdownContext } from '../contexts/CountdownContext';

export function Countdown() {
	const {
		minutes,
		seconds,
		hasFinished,
		isActive,
		startCountdown,
		resetCountdown,
	} = useContext(CountdownContext);

	const [minutesLeft, minutesRight] = String(minutes)
		.padStart(2, '0')
		.split('');
	const [secondsLeft, secondsRight] = String(seconds)
		.padStart(2, '0')
		.split('');

	return (
		<div>
			<div className={styles.countdownContainer}>
				<div>
					<span>{minutesLeft}</span>
					<span>{minutesRight}</span>
				</div>
				<span>:</span>
				<div>
					<span>{secondsLeft}</span>
					<span>{secondsRight}</span>
				</div>
			</div>

			{hasFinished ? (
				<button
					disabled
					className={`${styles.countdownButton} ${styles.countdownButtonDisabled}`}
				>
					Ciclo encerrado
					<FontAwesomeIcon icon={faCheckCircle} id={styles.checkIcon} />
				</button>
			) : (
				<>
					{isActive ? (
						<button
							type='button'
							onClick={resetCountdown}
							className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
						>
							Abandonar ciclo
							<FontAwesomeIcon icon={faTimesCircle} />
						</button>
					) : (
						<button
							type='button'
							onClick={startCountdown}
							className={styles.countdownButton}
						>
							Iniciar ciclo
							<FontAwesomeIcon icon={faChevronCircleRight} />
						</button>
					)}
				</>
			)}
		</div>
	);
}
