import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';

interface TCustomModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  urlToDownload: string;
  fileName: string;
}

export default function CustomModal({
  isOpen,
  onOpen,
  onClose,
  urlToDownload,
  fileName,
}: TCustomModal) {
  const [size, setSize] = React.useState('md');

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Download the file. Url generated for limited amount of time
              </ModalHeader>
              <ModalBody>
                <p className="text-center">{fileName}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>

                <a href={urlToDownload} target="_blank">
                  <Button color="primary" onPress={onClose}>
                    Download
                  </Button>
                </a>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
