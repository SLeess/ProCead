import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'flowbite-react';
import { AlertTriangle } from 'lucide-react';

const AccessDenied = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigate(-1);
  //   }, 5000); // Redirect after 5 seconds

  //   return () => clearTimeout(timer);
  // }, [navigate]);

  return (
    <div className="flex items-center justify-center h-11/12 dark:bg-gray-900">
      <Card className="max-w-md text-center">
        <div className="flex flex-col items-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Acesso Negado
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Você não tem permissão para visualizar esta página.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-300 mb-6">
            Você será redirecionado para a página anterior em 5 segundos.
          </p>
          <Button onClick={() => navigate(-1)} className='hover:cursor-pointer hover:bg-blue-700 hover:text-white' color="light">
            Voltar
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AccessDenied;
