import { motion } from "framer-motion"

const FloatingShape = ({ color, size, top, left, delay }) => {
    return (
        <motion.div
            className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl`}
            style={{ top, left }}
            animate={{
                y: ["0%", "100%", "0%"], // Move up and down
                x: ["0%", "100%", "0%"], // Move left and right
                rotate: [0, 360], // Rotate
            }}
            transition={{
                duration: 20, // Adjust the duration as needed
                ease: "linear", // Use linear easing
                repeat: Infinity, // Repeat indefinitely
                delay // Delay the animation
            }}
            aria-hidden="true"
        />
    )
}

export default FloatingShape
    