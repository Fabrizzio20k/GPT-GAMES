export default function Loader({ activate }: { activate: boolean }) {
    return (
        <div className={`${activate ? '' : 'hidden'} absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 flex justify-center items-center`}>
            <div className="loader">
                <div className="cell d-0"></div>
                <div className="cell d-1"></div>
                <div className="cell d-2"></div>

                <div className="cell d-1"></div>
                <div className="cell d-2"></div>


                <div className="cell d-2"></div>
                <div className="cell d-3"></div>


                <div className="cell d-3"></div>
                <div className="cell d-4"></div>
            </div>
        </div>
    );
}