<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class UserResetPassword extends Notification
{
    use Queueable;

    public $url;

    public function __construct($url)
    {
        $this->url = $url;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Redefinição de Senha do Sistema de ' + env('APP_NAME'))
            ->success()
            ->greeting('Prezado (a),')
            ->line('Você está recebendo este e-mail porque recebemos uma solicitação de redefinição de senha de sua conta.')
            ->action('REDEFINIR SENHA', $this->url)
            ->line('Este link de redefinição de senha expirará em 60 minutos. Se você não solicitou uma redefinição de senha, nenhuma ação adicional será necessária.');
    }

    public function toArray($notifiable)
    {
        return [

        ];
    }
}
