import { verifyMessage } from 'ethers/lib/utils'
import { motion } from 'framer-motion'

export const VerifyMessageInput = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='container-verify-message'>
            
            <input id='signature' placeholder='Signature'></input>
            <textarea id='message' placeholder='Message to Verify' rows='5' cols='50'></textarea>
            <button onClick={() => verifyMessage(
                document.querySelector('#message').value,
                document.querySelector('#signature').value
            )}>Verify Message</button>
        </motion.div>
    )
}