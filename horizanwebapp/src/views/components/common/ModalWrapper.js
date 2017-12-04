import React, { PureComponent } from 'react';
import Modal, { ModalHeader, ModalFooter, ModalTitle } from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import Banner from '@atlaskit/banner';

import Feedback from './FeedBack';

// props: onClose, showKeyline, modalTitle
const Header = ({
	onClose,
	modalTitle
}) => (
  <ModalHeader>
		<ModalTitle>
			{ modalTitle }
		</ModalTitle>
    <Button onClick={onClose} appearance="link" spacing="none">
      <CrossIcon
        label="Close Modal"
        size="small"
      />
    </Button>
  </ModalHeader>
);

// props: onClose, showKeyline, modalTitle
const Footer = ({
	onClose,
	/*
		Expects a div with buttons and corresponding
		onClick functions
		*/
	children
}) => (
	<ModalFooter>
		{ children }
		<Button appearance="subtle" onClick={onClose}>
			Cancel
		</Button>
	</ModalFooter>
);

const ModalWrapper = ({
	isOpen,
	onClose,
	content,
	title,
	footerContent,
	modalFeedback,
	dismissFeedback
}) => {
	let header = (
		<Header onClose={onClose}
			modalTitle={title} />
	);

	let feedback = !!modalFeedback ? (
		<Feedback code={modalFeedback.get('code')}
			message={modalFeedback.get('message')}
			type={modalFeedback.get('type')}
			onDismiss={dismissFeedback} />
	) : null;

	let footer = !!footerContent ? (
		<Footer onClose={onClose}>
			{ footerContent }
		</Footer>
	) : (
		<Footer onClose={onClose}/>
	);

	return isOpen ? (
		<Modal
			onClose={onClose}
			shouldCloseOnEscapePress={false}
			shouldCloseOnOverlayClick={true}
			width='small'>
			{ header }
			{ content }
			{ feedback }
			{ footer }
		</Modal>
	) : null;
}

export default ModalWrapper;