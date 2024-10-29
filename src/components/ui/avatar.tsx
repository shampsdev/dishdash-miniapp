import { CSSProperties } from "react";

interface AvatarProps {
    src: string;
    style: CSSProperties;
}

export const Avatar = ({ src, style }: AvatarProps) => {
    return <div style={style} className="w-[30px] rounded-full border-[3px] border-secondary overflow-hidden">
        <img className="w-full object-cover" src={src} />
    </div>
}
