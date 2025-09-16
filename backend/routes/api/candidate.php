<?php

use Illuminate\Support\Facades\Route;

Route::prefix('/candidato')->name('candidato.')->group(function(){
    /** --------------------- Inicio Rotas de Teste -------------------- */
    Route::name('home.')->group(function(){
        Route::get('/meus-processos', function(){
            $response = [
                'success' => true,
                'data'    =>
                collect(
                [
                    [
                        "id" => 1,
                        "edital" => 'EDITAL N.° 08/2025',
                        "descricao" => 'Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes Modalidade Educação a Distância',
                        "status" => "Em andamento",
                        "obs" => "",
                        // "obs" => "Inscrições abertas até 30/07/2025.",
                    ],
                    [
                        "id" => 2,
                        "edital" => 'EDITAL N.° 11/2024',
                        "descricao" => 'Processo de Seleção de Discentes para o Programa de Pós-Graduação em Biotecnologia (PPGBiotec)',
                        "status" => "Em andamento",
                        // "obs" => "Resultado da primeira fase previsto para 15/07/2025.",
                        "obs" => "",
                    ],
                    [
                        "id" => 3,
                        "edital" => 'EDITAL N.° 01/2025',
                        "descricao" => 'Seleção de tutores para cursos de Educação a Distância (EaD) - Área de Tecnologia',
                        "status" => "Encerrado",
                        // "obs" => "Inscrições finalizadas em 01/06/2025. Aguardando resultado final.",
                        "obs" => "",
                    ],
                    [
                        "id" => 4,
                        "edital" => 'EDITAL N.° 12/2024',
                        "descricao" => 'Seleção para Mestrado em Produção Vegetal no Semiárido - Turma 2025',
                        "status" => "Encerrado",
                        // "obs" => "Processo concluído. Matrículas realizadas.",
                        "obs" => "",
                    ],
                    [
                        "id" => 5,
                        "edital" => 'EDITAL N.° 03/2025',
                        "descricao" => 'Concurso Público para Professor Efetivo - Área de Direito',
                        "status" => "Em andamento",
                        // "obs" => "Provas objetivas agendadas para 20/08/2025.",
                        "obs" => "",
                    ],
                    [
                        "id" => 6,
                        "edital" => 'EDITAL N.° 05/2024',
                        "descricao" => 'Processo Seletivo Simplificado para Coordenador de Curso de Engenharia Civil Processo Seletivo Simplificado para Coordenador de Curso de Engenharia Civil Processo Seletivo Simplificado para Coordenador de Curso de Engenharia Civil',
                        "status" => "Encerrado",
                        // "obs" => "Candidato aprovado e empossado.",
                        "obs" => "",
                    ],
                    [
                        "id" => 7,
                        "edital" => 'EDITAL N.° 07/2025',
                        "descricao" => 'Residência Médica em Cirurgia Geral - Ano 2026',
                        "status" => "Em andamento",
                        // "obs" => "Período de recurso para a prova teórica. Resultado final em Setembro.",
                        "obs" => "",
                    ],
                    [
                        "id" => 8,
                        "edital" => 'EDITAL N.° 02/2025',
                        "descricao" => 'Bolsas de Pós-Doutorado PNPD/CAPES - Ciências Humanas',
                        "status" => "Encerrado",
                        // "obs" => "Seleção finalizada. Início das atividades em 01/08/2025.",
                        "obs" => "",
                    ],
                    [
                        "id" => 9,
                        "edital" => 'EDITAL N.° 09/2025',
                        "descricao" => 'Curso de Extensão em Marketing Digital - Turma de Verão',
                        "status" => "Em andamento",
                        // "obs" => "Últimas vagas disponíveis. Início das aulas em 05/08/2025.",
                        "obs" => "",
                    ],
                    [
                        "id" => 10,
                        "edital" => 'EDITAL N.° 04/2024',
                        "descricao" => 'Seleção de Professores Temporários - Licenciatura em Química',
                        "status" => "Encerrado",
                        // "obs" => "Edital homologado e classificados divulgados.",
                        "obs" => "",
                    ],
                    [
                        "id" => 11,
                        "edital" => 'EDITAL N.° 06/2025',
                        "descricao" => 'Processo de Seleção para Auxiliar Administrativo - Cursinho Popular',
                        "status" => "Em andamento",
                        // "obs" => "Entrevistas agendadas para a próxima semana.",
                        "obs" => "",
                    ],
                    [
                        "id" => 12,
                        "edital" => 'EDITAL N.° 10/2025',
                        "descricao" => 'Chamada Pública para Atores para Peça Teatral Universitária',
                        "status" => "Em andamento",
                        // "obs" => "Audições abertas até 25/07/2025.",
                        "obs" => "",
                    ],
                ]) ->sort(function($a, $b){
                    return
                        $a['status'] <=> $b['status'];
                })->values()
                ->toArray(),
                'message' => 'Processos seletivos pessoais encaminhados com sucesso.',
            ];
            return response()->json($response, 200);
        });
    });
    /** ---------------------- Fim Rotas de Teste ---------------------- */
});
