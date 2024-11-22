import { motion } from "framer-motion";
import { CSSProperties, ReactElement } from "react";


interface AvatarProps {
    src: string;
    fallback: string;
    fallbackElement?: ReactElement;
    style: CSSProperties;
}

export const Avatar = ({ src, fallback, style, fallbackElement }: AvatarProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={style}
            className="max-h-[30px] max-w-[30px] w-full aspect-square bg-background rounded-full border-[3px] border-secondary overflow-hidden flex items-center justify-center"
        >
            {src !== '' ? (
                <img
                    className="w-full h-full object-cover"
                    src={src}
                />
            ) : (
                fallbackElement !== undefined ? fallbackElement : <span className="text-primary font-medium text-xs">{fallback}</span>
            )}
        </motion.div>
    );
};

