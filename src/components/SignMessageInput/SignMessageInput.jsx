import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAccount, useConnect, useSignMessage } from 'wagmi'


export const SignMessageInput = () => {
    // useState()
    const modal = document.querySelector('#signature-modal');
    const {isConnected } = useAccount()
    const { data, signMessageAsync } = useSignMessage();
    const { connect, connectors, error, isLoading, pendingConnector } =
        useConnect();

    const sign = async () => {
        await signMessageAsync({message: document.querySelector("#message").value});
        modal.showModal();
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <>
                {/* {isConnected && <div>connected as {address}</div>} */}

                {!isConnected ? connectors.map((connector) => (
                    <button
                        disabled={!connector.ready}
                        key={connector.id}
                        onClick={() => connect({ connector })}
                    >
                        {isLoading &&
                            pendingConnector?.id === connector.id ?
                            ' (connecting)' : 'connect'}
                    </button>
                )) : 
                    (
                        <motion.div>
                            <textarea id="message" placeholder='Message to Sign' rows="10" cols="50"></textarea>
                            <button onClick={() => sign()}>Sign Message</button>
                        </motion.div>
                       
                    )
                }
                {error && <div>{error.message}</div>}
                
                <dialog id="signature-modal">
                    <button onClick={() => modal.close()} id="close-modal">(x)</button>
                    <h2 id="modal-title">Signature</h2>
                    <p>{data}</p>
                </dialog>
            </>
        </motion.div>
    );
}