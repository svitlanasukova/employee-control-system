import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.module.scss';

const Backdrop = props => {
	return <div className={styles.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = props => {
	return (
		<div className={styles.modal}>
			<span className={styles.close} onClick={props.onClose}>
				x
			</span>
			<div className={styles.content}>{props.children}</div>
		</div>
	);
};

const protalElement = document.getElementById('ovarlays');

const Modal = props => {
	return (
		<Fragment>
			{ReactDOM.createPortal(
				<Backdrop onClose={props.onClose} />,
				protalElement,
			)}
			{ReactDOM.createPortal(
				<ModalOverlay onClose={props.onClose}>{props.children}</ModalOverlay>,
				protalElement,
			)}
		</Fragment>
	);
};

export default Modal;
