import './App.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { SignMessageInput } from './components/SignMessageInput/SignMessageInput';
import {
    WagmiConfig,
    createClient,
    configureChains,
    defaultChains,
} from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'


const MODES = {
    Sign: 'Sign',
    Select: 'Select',
    Verify: 'Verify'
}

export const App = () => {
    const { chains, provider, webSocketProvider } = configureChains(
        defaultChains,
        [publicProvider()],
    )

    const client = createClient({
        autoConnect: true,
        provider,
        webSocketProvider,
    });

    const [currMode, setCurrMode] = useState(MODES.Select);

    return (
        <WagmiConfig client={client}>
            <div>
                <motion.div
                    className='blue-gradient'
                >
                    {currMode === MODES.Select || currMode === MODES.Sign ?
                        <AnimatePresence>
                            <motion.p
                                onTap={() => { currMode !== MODES.Sign ? setCurrMode(MODES.Sign) : setCurrMode(MODES.Select) }}
                                initial={{ opacity: 0 }}
                                whileTap={{ scale: 1.17 }}
                                whileHover={{ scale: 1.1 }}
                                animate={currMode === MODES.Verify ? { opacity: 0 } : { opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >SIGN MESSAGE</motion.p>
                        </AnimatePresence>
                        : <AnimatePresence>
                            <SignMessageInput
                            ></SignMessageInput>
                        </AnimatePresence>
                    }
                </motion.div>
                <div
                    className='middle'
                >
                    <hr></hr>
                </div>
                <motion.div
                    className='red-gradient'
                >
                    {currMode === MODES.Select || currMode === MODES.Verify ?
                        <motion.p
                            onTap={() => { currMode !== MODES.Verify ? setCurrMode(MODES.Verify) : setCurrMode(MODES.Select) }}
                            initial={{ opacity: 1 }}
                            whileTap={{ scale: 1.17 }}
                            whileHover={{ scale: 1.1 }}
                            animate={currMode === MODES.Sign ? { opacity: 0 } : { opacity: 1 }}
                        >VERIFY MESSAGE</motion.p>
                        : <div>input box</div>
                    }
                </motion.div>
            </div>
        </WagmiConfig>
    );
}

// When progress hits 0 or 1, start an animation