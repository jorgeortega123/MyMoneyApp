import React from 'react'

export default function SendTelegramBotJsonData() {
     var chat_id = 3934859345; // replace with yours
     var enc_data = "This is my default text";
     var token = "45390534dfsdlkjfshldfjsh28453945sdnfnsldfj427956345"; // from botfather
     
     var blob = new Blob([enc_data], { type: 'plain/text' });
     var formData = new FormData();
     formData.append('chat_id', chat_id);
     formData.append('document', blob, 'document.txt');
     var request = new XMLHttpRequest();
     request.open('POST', `https://api.telegram.org/bot${token}/sendDocument`);
     request.send(formData);   
  return (
    <div>Sending...</div>
  )
}
