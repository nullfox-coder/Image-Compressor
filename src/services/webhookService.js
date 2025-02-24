const axios = require('axios');

class WebhookService {
  static async notify(webhookUrl, data) {
    try {
      await axios.post(webhookUrl, data);
      console.log('Webhook notification sent successfully');
    } catch (error) {
      console.error('Webhook notification failed:', error);
    }
  }
}

module.exports = WebhookService;