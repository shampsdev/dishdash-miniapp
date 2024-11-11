import { motion } from "framer-motion";
import { CSSProperties } from "react";

interface AvatarProps {
    src: string;
    style: CSSProperties;
}

export const Avatar = ({ src, style }: AvatarProps) => {
    return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={style} className="w-[30px] rounded-full border-[3px] border-secondary overflow-hidden">
        <img className="w-full object-cover" src={src} />
    </motion.div>
}
