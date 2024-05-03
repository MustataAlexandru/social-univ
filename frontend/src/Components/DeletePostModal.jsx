"use client";

import {Button, Modal} from "flowbite-react";
import {HiOutlineExclamationCircle} from "react-icons/hi";

export function DeletePostModal({state, post, handler, close}) {


    const onConfirm = () => {
        handler(post);
        close();
    }

    return (
        <>
            <Modal className='loading-f' show={state} size="md" onClose={() => close()} popup style={{zIndex: 200}}>
                <Modal.Header/>
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle
                            className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"/>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Sigur vrei sa stergi?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={() => onConfirm()}>
                                {"Da vreau"}
                            </Button>
                            <Button color="gray" onClick={() => close()}>
                                Nu vreau
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
