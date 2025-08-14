import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAppData } from '../../hooks/useAppData'; // To get settings for logo
import { APP_NAME, BellIcon } from '../../constants';
import toast from 'react-hot-toast';
import Modal from '../../components/Modal';

const ChangelogContent: React.FC = () => (
  <div className="space-y-4 text-sm text-text-secondary max-h-[60vh] overflow-y-auto pr-2">
    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
      <h3 className="font-semibold text-text-primary">Versão 2.1.0 (Atual)</h3>
      <ul className="list-disc list-inside mt-1 space-y-1">
        <li>Interface Monocromática: O aplicativo agora usa um tema em tons de cinza para um visual mais sóbrio e focado. Cores são usadas para alertas.</li>
        <li>Fonte Robuck: A identidade visual "BIG" foi atualizada com a nova fonte.</li>
        <li>Tela de Login: Adicionado alerta de novidades e design refinado.</li>
      </ul>
    </div>
    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
      <h3 className="font-semibold text-text-primary">Versão 2.0.0</h3>
      <ul className="list-disc list-inside mt-1 space-y-1">
        <li>Novo Módulo de Rascunhos: Crie roteiros e anotações de texto diretamente no sistema.</li>
        <li>Editor de Roteiro: Ferramenta para estruturar cenas, descrições e calcular a duração total do vídeo.</li>
        <li>Anexos de Imagens: Adicione referências visuais aos seus rascunhos.</li>
      </ul>
    </div>
    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
      <h3 className="font-semibold text-text-primary">Versão 1.5.0</h3>
      <ul className="list-disc list-inside mt-1 space-y-1">
        <li>Sistema de Autenticação: Introdução de login e registro de usuários para segurança dos dados.</li>
        <li>Tela de Abertura: Nova animação de boas-vindas com a marca da aplicação.</li>
      </ul>
    </div>
  </div>
);


const LoginPage: React.FC = () => {
  const [username, setUsername] = useState(''); // Changed from email
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdatesModalOpen, setUpdatesModalOpen] = useState(false);
  const { login } = useAuth();
  const { settings } = useAppData(); // For logo
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await login(username, password); // Changed from email
    setIsLoading(false);
    if (success) {
      toast.success('Login bem-sucedido!');
      navigate('/dashboard');
    } else {
      toast.error('Falha no login. Verifique seu usuário e senha.'); // Updated error message
    }
  };

  const handleAdminLogin = async () => {
    setIsLoading(true);
    const success = await login('admin', 'admin');
    setIsLoading(false);
    if (success) {
      toast.success('Login de administrador bem-sucedido!');
      navigate('/dashboard');
    } else {
      toast.error('Falha no login de administrador.');
    }
  };
  
  const commonInputClass = "w-full px-4 py-3 border border-border-color rounded-lg shadow-sm focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-shadow bg-card-bg text-text-primary placeholder-text-secondary";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      <button
        onClick={() => setUpdatesModalOpen(true)}
        className="fixed top-4 right-4 p-3 bg-card-bg rounded-full shadow-lg hover:bg-slate-100 transition-colors z-10 text-accent hover:text-yellow-500"
        title="Ver novidades e atualizações"
      >
        <BellIcon size={24} />
      </button>

      <div className="w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          {settings.customLogo ? (
            <img src={settings.customLogo} alt={`${APP_NAME} Logo`} className="h-12 sm:h-16 mx-auto mb-2 object-contain" />
          ) : (
            <h1 className="text-6xl sm:text-7xl font-bold text-accent mb-2 font-robuck tracking-wide">{APP_NAME}</h1>
          )}
          <p className="text-text-secondary">Acesse sua conta para continuar.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card-bg shadow-xl rounded-xl p-6 sm:p-8 space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-text-secondary mb-1">Usuário</label> {/* Changed from Email */}
            <input
              type="text" // Changed from email
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Changed from setEmail
              className={commonInputClass}
              placeholder="seu_usuario" // Changed placeholder
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-1">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={commonInputClass}
              placeholder="••••••••"
              required
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-accent text-white py-3 px-4 rounded-lg shadow-md hover:brightness-90 transition-all duration-150 ease-in-out font-semibold text-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
          <div className="space-y-2 text-center">
             <p className="text-sm text-text-secondary">
                Não tem uma conta?{' '}
                <Link to="/register" className="font-medium text-accent hover:underline">
                Registrar-se
                </Link>
            </p>
             <button
                type="button"
                onClick={handleAdminLogin}
                disabled={isLoading}
                className="w-full bg-slate-600 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-slate-700 transition-colors text-sm disabled:opacity-70"
             >
                Entrar como Admin (Beta)
            </button>
          </div>
        </form>
      </div>
      <footer className="text-center text-xs text-slate-500 mt-8 sm:mt-12">
        <p>&copy; {new Date().getFullYear()} {APP_NAME} Soluções. Todos os direitos reservados.</p>
      </footer>

      <Modal isOpen={isUpdatesModalOpen} onClose={() => setUpdatesModalOpen(false)} title="Novidades e Atualizações" size="lg">
        <ChangelogContent />
      </Modal>
    </div>
  );
};

export default LoginPage;