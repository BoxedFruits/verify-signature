import { motion } from 'framer-motion';
import { useAccount, useConnect, useSignMessage } from 'wagmi'

export const SignMessageInput = () => {
    const {isConnected } = useAccount()
    const { signMessage } = useSignMessage();
    const { connect, connectors, error, isLoading, pendingConnector } =
        useConnect();

    const sign = async () => {
        signMessage({message: document.querySelector("#message").value})
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
            </>
        </motion.div>
    );
}