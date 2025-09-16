import styles from './LoaderDots.module.css';

export default function LoaderDots({  width, height})
{
    return (
        // <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#d6d6d650]" >
        <div className={`${styles.loader} p-2`} style={{
            width: width,
            height: height,
        }}></div>
        // </div>
    );
}