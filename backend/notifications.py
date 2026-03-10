"""
Serviço de notificações por Email e WhatsApp
"""
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import logging

logger = logging.getLogger(__name__)


class NotificationService:
    def __init__(self):
        self.email_enabled = os.environ.get('EMAIL_NOTIFICATIONS_ENABLED', 'false').lower() == 'true'
        self.whatsapp_enabled = os.environ.get('WHATSAPP_NOTIFICATIONS_ENABLED', 'false').lower() == 'true'
        
        # Configurações de Email
        self.smtp_host = os.environ.get('SMTP_HOST', 'smtp.gmail.com')
        self.smtp_port = int(os.environ.get('SMTP_PORT', '587'))
        self.smtp_user = os.environ.get('SMTP_USER', '')
        self.smtp_password = os.environ.get('SMTP_PASSWORD', '')
        self.notification_email = os.environ.get('NOTIFICATION_EMAIL', '')
        
        # Configurações de WhatsApp
        self.whatsapp_number = os.environ.get('WHATSAPP_NOTIFICATION_NUMBER', '')
    
    def send_email_notification(self, lead_data: dict) -> bool:
        """
        Envia notificação por email quando um novo lead é cadastrado
        """
        if not self.email_enabled:
            logger.info("Email notifications disabled")
            return False
        
        if not all([self.smtp_user, self.smtp_password, self.notification_email]):
            logger.error("Email configuration incomplete")
            return False
        
        try:
            # Criar mensagem
            msg = MIMEMultipart('alternative')
            msg['Subject'] = f'🏢 Novo Lead Cadastrado - {lead_data["nome"]}'
            msg['From'] = self.smtp_user
            msg['To'] = self.notification_email
            
            # Corpo do email em HTML
            html_body = f"""
            <html>
                <head>
                    <style>
                        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                        .header {{ background: linear-gradient(135deg, #d97706 0%, #b45309 100%); 
                                  color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
                        .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }}
                        .lead-info {{ background: white; padding: 20px; border-radius: 8px; margin: 20px 0; 
                                     box-shadow: 0 2px 4px rgba(0,0,0,0.1); }}
                        .info-row {{ padding: 12px 0; border-bottom: 1px solid #eee; }}
                        .info-row:last-child {{ border-bottom: none; }}
                        .label {{ font-weight: bold; color: #666; display: inline-block; width: 150px; }}
                        .value {{ color: #333; }}
                        .cta-button {{ display: inline-block; background: #d97706; color: white; 
                                      padding: 12px 30px; text-decoration: none; border-radius: 5px; 
                                      margin-top: 20px; }}
                        .footer {{ text-align: center; padding: 20px; color: #666; font-size: 12px; }}
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🏢 Novo Lead Cadastrado!</h1>
                            <p>Quadra 500 Sudoeste</p>
                        </div>
                        <div class="content">
                            <p>Um novo interessado acabou de se cadastrar no site:</p>
                            
                            <div class="lead-info">
                                <div class="info-row">
                                    <span class="label">👤 Nome:</span>
                                    <span class="value">{lead_data['nome']}</span>
                                </div>
                                <div class="info-row">
                                    <span class="label">📧 Email:</span>
                                    <span class="value"><a href="mailto:{lead_data['email']}">{lead_data['email']}</a></span>
                                </div>
                                <div class="info-row">
                                    <span class="label">📱 Celular:</span>
                                    <span class="value">
                                        <a href="https://wa.me/55{lead_data['celular']}">{lead_data['celular']}</a>
                                    </span>
                                </div>
                                <div class="info-row">
                                    <span class="label">🏠 Interesse:</span>
                                    <span class="value">{lead_data['quartos']} quartos</span>
                                </div>
                                <div class="info-row">
                                    <span class="label">📅 Data/Hora:</span>
                                    <span class="value">{datetime.now().strftime('%d/%m/%Y às %H:%M')}</span>
                                </div>
                            </div>
                            
                            <center>
                                <a href="https://wa.me/55{lead_data['celular']}" class="cta-button">
                                    💬 Entrar em Contato via WhatsApp
                                </a>
                            </center>
                            
                            <p style="margin-top: 30px; color: #666; font-size: 14px;">
                                💡 <strong>Dica:</strong> Entre em contato o quanto antes! 
                                Leads respondidos rapidamente têm maior chance de conversão.
                            </p>
                        </div>
                        <div class="footer">
                            <p>Quadra 500 Sudoeste - Sistema de Gestão de Leads</p>
                            <p>Este é um email automático. Para gerenciar seus leads, acesse o painel administrativo.</p>
                        </div>
                    </div>
                </body>
            </html>
            """
            
            # Anexar corpo HTML
            part = MIMEText(html_body, 'html')
            msg.attach(part)
            
            # Conectar e enviar
            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_user, self.smtp_password)
                server.send_message(msg)
            
            logger.info(f"Email notification sent successfully to {self.notification_email}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send email notification: {str(e)}")
            return False
    
    def send_whatsapp_notification(self, lead_data: dict) -> bool:
        """
        Prepara notificação para WhatsApp
        Por enquanto, apenas loga a informação
        Pode ser integrado com Twilio ou WhatsApp Business API
        """
        if not self.whatsapp_enabled:
            logger.info("WhatsApp notifications disabled")
            return False
        
        try:
            message = f"""
🏢 *Novo Lead - Quadra 500 Sudoeste*

👤 *Nome:* {lead_data['nome']}
📧 *Email:* {lead_data['email']}
📱 *Celular:* {lead_data['celular']}
🏠 *Interesse:* {lead_data['quartos']} quartos
📅 *Data:* {datetime.now().strftime('%d/%m/%Y às %H:%M')}

💬 Link para contato:
https://wa.me/55{lead_data['celular']}
            """.strip()
            
            # Por enquanto, apenas loga
            # Pode ser integrado com Twilio ou WhatsApp Business API depois
            logger.info(f"WhatsApp notification prepared: {message}")
            
            # TODO: Integrar com Twilio ou WhatsApp Business API
            # Para Twilio:
            # from twilio.rest import Client
            # client = Client(account_sid, auth_token)
            # message = client.messages.create(
            #     from_='whatsapp:+14155238886',
            #     body=message,
            #     to=f'whatsapp:{self.whatsapp_number}'
            # )
            
            return True
            
        except Exception as e:
            logger.error(f"Failed to send WhatsApp notification: {str(e)}")
            return False
    
    def notify_new_lead(self, lead_data: dict):
        """
        Envia todas as notificações configuradas
        """
        results = {
            'email': False,
            'whatsapp': False
        }
        
        if self.email_enabled:
            results['email'] = self.send_email_notification(lead_data)
        
        if self.whatsapp_enabled:
            results['whatsapp'] = self.send_whatsapp_notification(lead_data)
        
        return results


# Instância global do serviço
notification_service = NotificationService()
