const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {/* Ícone de loading com animação suave */}
            <div className="relative w-16 h-16">
                <div
                    className="absolute inset-0 border-4 border-t-transparent border-yellow-500 rounded-full animate-spin"></div>
            </div>

            {/* Texto com efeito de fade-in */}
            <p className="mt-4 text-lg font-semibold text-yellow-400 animate-pulse">
                Carregando...
            </p>
        </div>
    );
};

export default Loading;
