<table style="width: 100%; border-collapse: collapse;">
    <tr>
        <td style="text-align: center; width: 2%;">
            <img src="data:image/png;base64,{{ base64_encode(file_get_contents(public_path('img/logo_unimontes.png'))) }}"
                style="margin-top: 5px; width: 80px; height: auto;" class="col-xs-12 logo" />
        </td>
        <td style="text-align: center; width: 98%; margin: 0px 20px;font-size:0.82rem;">
            <b style="font-size:0.86rem;">UNIVERSIDADE ESTADUAL DE MONTES CLAROS - Centro de Educação a Distância</b><br>
            Campus Universitário Professor Darcy Ribeiro - Unimontes - Prédio 7 | CEP: 39401-089<br>
            Montes Claros, Minas Gerais, Brasil | <i style="font-size:0.66rem;">www.cead.unimontes.br</i>
        </td>
        <td style="text-align: center; width: 2%;">
            <img src="data:image/png;base64,{{ base64_encode(file_get_contents(public_path('img/logo_cead_bg.png'))) }}"
            style="margin-top: 5px; width: 90px; height: auto;" class="col-xs-12 logo" />
        </td>
    </tr>
</table>

<br>
<hr style="height: 0.6px;background-color: #000000b4;border: none;">
<table style="border-collapse: separate; border-spacing: 10px 0px; width: 100%; margin: 30px 0px;">
    <thead>
        <tr style="text-align: center;">
            <th class="row">
                <td style="width: 100%;font-size:1.04rem;">
                    {{ $title }}
                </td>
            </th>
        </tr>
    </thead>
</table>

<table style="border-collapse: separate; border-spacing: 10px 0px; width: 100%; margin-bottom: 20px;">
    <thead>
        <tr style="text-align: center;">
            <th class="row">
                <td style="width: 100%;font-size:1.09rem;">
                    {{ $subtitle }}
                </td>
            </th>
        </tr>
    </thead>
</table>


<p style="width: 100%; padding:10px;font-size: 0.80rem;">
    Data de emissão: {{ now()->locale('pt_BR')->isoFormat('D [de] MMMM [de] YYYY, H\hmm') }}.
</p>
<hr style="height: 0.08px;background-color: #0000002e;border: none;">
