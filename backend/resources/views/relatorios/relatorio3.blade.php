<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>{{ $data['titulo'] }}</title>
    <style>
        * {
            font-size: .95rem;
        }

        .table-content th,
        .table-comtent td {
            border-bottom: 2px solid #DDDDDD;
            border-top: 2px solid #DDDDDD;
        }

        .title {
            font-size: 1.2rem;
            background-color: #ccc;
            text-transform: uppercase;
        }

        .subtitle {
            font-size: 1rem;
            text-transform: uppercase;
        }

        .break {
            page-break-after: always;
        }

        .cabecalho {
            text-align: center
        }
    </style>
</head>

<body>

    {{-- @include('cabecalho', ['title' => $data['titulo'], 'subtitle' => $data['subtitulo']]) --}}
    {{-- <h2 style="font-size:1.06rem;margin-top: 0px; margin-bottom: 15px;">{{ $data['tableName'] }}</h2> --}}
    @if (sizeof($data['rows']) == 0)
        <p>Nenhum registro enviado ou encontrado</p>
    @else
        @foreach ($data['rows'] as $key => $grupo)
            @include('cabecalho', ['title' => $data['titulo'], 'subtitle' => $data['subtitulo']])

            <h1>{{ str_replace('_', ' ', ucwords($data['groupByFields'][0])) . ': ' . $key }}</h1>
            <hr />
            @foreach ($grupo as $subgroupKey => $subgroup)
                <h2>{{ str_replace('_', ' ', ucwords($data['groupByFields'][1])) . ': ' . $subgroupKey }}</h2>
                
                @foreach ($subgroup as $subSubgroupKey => $subSubgroup )
                <h2>{{ str_replace('_', ' ', ucwords($data['groupByFields'][2])) . ': ' . $subSubgroupKey }}</h2>
                
                <table class="table-content" style="margin-bottom: 10px;width: 100%;text-align: center;">
                    <thead>
                        <tr>

                            @foreach ($data['columns'] as $column)
                                {{-- <th style="width: 10%">{{ $column['header'] }}</th> --}}
                                <th >{{ $column['header'] }}</th>
                            @endforeach
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($subSubgroup as $element)
                            <tr>
                                @foreach ($data['columns'] as $column)
                                    {{-- <td style="width: 10%;">{{ $element[$column['id']] }}</td> --}}
                                    <td>{{ $element[$column['id']] }}</td>
                                @endforeach
                            </tr>
                        @endforeach
                    </tbody>
                </table>
                @endforeach

            @endforeach
            @if ($loop->index < count($grupo))
                    <div class="break"></div>
                @endif
        @endforeach
    @endif

    <script type="text/php">
        if ( isset($pdf) ) {
            $text = "Página {PAGE_NUM} de {PAGE_COUNT}";
            $font = $fontMetrics->get_font("helvetica", "bold");
            $size = 8;
            $color = array(0,0,0);
            $word_space = 0.0;  //  default
            $char_space = 0.0;  //  default
            $angle = 0.0;   //  default

            $text_height = $fontMetrics->getFontHeight($text, $size);
            $textWidth = $fontMetrics->getTextWidth($text, $font, $size) / 2;

            $x = $pdf->get_width() - $textWidth - 36;
            $y = $pdf->get_height() - $text_height - 16;

            $pdf->page_text($x, $y, $text, $font, $size, $color, $word_space, $char_space, $angle);
        }
    </script>
</body>

</html>
