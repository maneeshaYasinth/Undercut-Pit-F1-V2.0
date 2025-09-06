import { motion } from "framer-motion";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
      <motion.div
        className="flex items-center space-x-2"
        initial={{ x: "-100vw" }}
        animate={{ x: "100vw" }}
        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
      >
        {/* Car */}
        <motion.div
          className="w-16 h-8 bg-red-600 rounded-md relative"
          animate={{ rotate: [0, -2, 2, 0] }}
          transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Wheels */}
          <div className="w-4 h-4 bg-black rounded-full absolute -bottom-2 left-1"></div>
          <div className="w-4 h-4 bg-black rounded-full absolute -bottom-2 right-1"></div>
        </motion.div>

        {/* Speed lines */}
        <motion.div
          className="h-1 w-10 bg-yellow-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.3, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
}
