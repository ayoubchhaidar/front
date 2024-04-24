import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MydataService } from '../services/mydata.service';
import { ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})

export class ChatbotComponent {
  answer: string = "";
  @Input() pdfID: any=""; // Input property to receive the PDF ID
  // pdfID: any = "14P4V6abCrSNlYtxFfNNDZbJ_iQakPLU0";
  query: string = "";
  @ViewChild('chatInput') chatInput: ElementRef | undefined;

  constructor(private MydataService: MydataService, private route: ActivatedRoute) { }

  ngOnInit() {

  }
  updatePdfId(newPdfId: string) {
    this.pdfID = newPdfId;
    // You can perform any other necessary actions here
  }
  onSubmit() {
    this.generateMessage(this.query, 'self');
    this.MydataService.generateAnswr(this.pdfID, this.query).subscribe(
      (data: any) => {
        this.generateMessage(data, 'bot');
        console.log(this.pdfID,"pdf")
      },
      (error: any) => {
        console.error('Error fetching response:', error);
      }
    );
    this.query = '';
  }
 generateMessage(message: string, type: string) {
    const INDEX = $('.chat-msg').length + 1; // Count the number of existing chat messages
    let str = ""; 
    const label = (type === 'self') ? 'Moi: ' : 'Assistant: ';

    // Construct the message frame HTML
    str += "<div id='cm-msg-" + INDEX + "' class=\"chat-msg " + type + "\">";
    str += "<div class=\"msg-content\">";
    str += "<div class=\"label\">" + label + "</div>"; // Add label (Moi/Assistant)
    str += "<div class=\"cm-msg-text\">";
    str += message; // Add the message content
    str += "</div>"; // Close cm-msg-text
    str += "</div>"; // Close msg-content
    str += "</div>"; // Close chat-msg
    $(".chat-logs").append(str);
    // Automatically scroll to the bottom of the chat logs container
    $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
}



  
  toggleChat() {
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
  }
}
