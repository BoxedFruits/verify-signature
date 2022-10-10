import { verifyMessage } from 'ethers/lib/utils'
import { motion } from 'framer-motion'
import { useState } from 'react'

export const VerifyMessageInput = () => {
    const [signerAddress, setSignerAddress] = useState();
    const _verifyMessage = () => {
        //Need error handling
        setSignerAddress(verifyMessage(
            document.querySelector('#message').value,
            document.querySelector('#signature').value
        ));
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='container-verify-message'>
            <input id='signature' placeholder='Signature'></input>
            
            <textarea id='message' placeholder='Message to Verify' rows='5' cols='50'></textarea>
            
            <button className="btn" onClick={() => _verifyMessage()}>Verify Message</button>
            
            {signerAddress && <div>The address that signed the message is: {signerAddress}</div>}
        </motion.div>
        
    )
}