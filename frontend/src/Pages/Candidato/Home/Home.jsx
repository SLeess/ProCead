export default function Home()
{
    return (
        <>
            <h1 className="title">Latests Posts</h1>
            <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-300">
                
                <header className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm shadow-sm p-4 flex justify-between items-center sticky top-0">
                    <h1 className="text-xl font-bold">
                    React 19 & Tailwind v4
                    </h1>
                    {/* <ThemeToggleButton /> */}
                </header>

                <main className="p-8">
                    <div className="max-w-md mx-auto bg-slate-100 dark:bg-slate-800 rounded-lg p-6 shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Olá, Mundo!</h2>
                    <p>
                        Este card e todo o texto dentro dele mudam de cor automaticamente 
                        quando você alterna o tema. A configuração com a stack moderna é 
                        muito mais limpa!
                    </p>
                    </div>
                </main>
                
            </div>
        </>
    );
}


