const { createApp } = Vue;

createApp({
  data() {
    return {
      contacts: [
        {
          name: "Michele",
          avatar: "_1",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Hai portato a spasso il cane?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Ricordati di stendere i panni",
              status: "sent",
            },
            {
              date: "10/01/2020 16:15:22",
              message: "Tutto fatto!",
              status: "received",
            },
          ],
        },
        {
          name: "Fabio",
          avatar: "_2",
          visible: true,
          messages: [
            {
              date: "20/03/2020 16:30:00",
              message: "Ciao come stai?",
              status: "sent",
            },
            {
              date: "20/03/2020 16:30:55",
              message: "Bene grazie! Stasera ci vediamo?",
              status: "received",
            },
            {
              date: "20/03/2020 16:35:00",
              message: "Mi piacerebbe ma devo andare a fare la spesa.",
              status: "sent",
            },
          ],
        },
        {
          name: "Samuele",
          avatar: "_3",
          visible: true,
          messages: [
            {
              date: "28/03/2020 10:10:40",
              message: "La Marianna va in campagna",
              status: "received",
            },
            {
              date: "28/03/2020 10:20:10",
              message: "Sicuro di non aver sbagliato chat?",
              status: "sent",
            },
            {
              date: "28/03/2020 16:15:22",
              message: "Ah scusa!",
              status: "received",
            },
          ],
        },
        {
          name: "Alessandro B.",
          avatar: "_4",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Lo sai che ha aperto una nuova pizzeria?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Si, ma preferirei andare al cinema",
              status: "received",
            },
          ],
        },
        {
          name: "Alessandro L.",
          avatar: "_5",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ricordati di chiamare la nonna",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Va bene, stasera la sento",
              status: "received",
            },
          ],
        },
        {
          name: "Claudia",
          avatar: "_6",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao Claudia, hai novità?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Non ancora",
              status: "received",
            },
            {
              date: "10/01/2020 15:51:00",
              message: "Nessuna nuova, buona nuova",
              status: "sent",
            },
          ],
        },
        {
          name: "Federico",
          avatar: "_7",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Fai gli auguri a Martina che è il suo compleanno!",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Grazie per avermelo ricordato, le scrivo subito!",
              status: "received",
            },
          ],
        },
        {
          name: "Davide",
          avatar: "_8",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao, andiamo a mangiare la pizza stasera?",
              status: "received",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "No, l'ho già mangiata ieri, ordiniamo sushi!",
              status: "sent",
            },
            {
              date: "10/01/2020 15:51:00",
              message: "OK!!",
              status: "received",
            },
          ],
        },
      ],
      currentChat: 0,
      userMsg: "",
      currentMsg: 0,
      msgMenu: false,
      userSearch: "",
      typing: false,
      chatOptions: false,
      msgCount: true,
      rndAnswers: [
        "ciao",
        "hey",
        "Al momento non saprei dirti",
        "Posso richiamarti dopo?",
        "ok",
        "Non posso lamentarmi.",
        "Certo",
        "Grande",
        "Non so proprio",
        "bho",
      ],
      newContactName: "",
      newContactImg: "",
      appMenuVisibility: true,
      addContactMenu: true,
    };
  },
  methods: {
    // show clicked chat in chat history and show it into main-content
    showChat(clickedChat) {
      this.currentChat = clickedChat;
      this.currentMsg = null;
      this.msgCount = true;
    },
    // send msg
    sendMsg(index) {
      // only if not empty string
      if (this.userMsg != "") {
        // get current date and time
        let date = new Date().toLocaleString().replace(",", "");
        // create new masg obj
        const newMsg = {
          date: date,
          message: this.userMsg,
          status: "sent",
        };
        // push new msg into messages array
        this.contacts[index].messages.push(newMsg);
        //clear input field
        this.userMsg = "";
        // set typing to true
        this.typing = true;
        // start automated answer
        this.automaticMsg(index);
        // scroll to last msg in chat
        this.$nextTick(() => {
          this.scrollToEnd();
        });
      }
    },
    // automated msg
    automaticMsg(index) {
      setTimeout(() => {
        //get current date/time
        let date = new Date().toLocaleString().replace(",", "");
        // gen rnd nr
        const rndMsg = Math.floor(
          Math.random() * (this.rndAnswers.length - 1 - 0 + 1) + 0
        );
        // create new msg bj
        const newMsg = {
          date: date,
          // set message to the rnd nr index of rndAnswers
          message: this.rndAnswers[rndMsg],
          status: "received",
        };
        // push new msg into messages array
        this.contacts[index].messages.push(newMsg);
        this.typing = false;
        // scroll to last msg in chat
        this.$nextTick(() => {
          this.scrollToEnd();
        });
      }, 2000);
    },
    // deleted current msg
    deleteMsg(index) {
      this.contacts[this.currentChat].messages.splice(index, 1);
      this.currentMsg = null;
    },
    // show options menu when msg chevron is clicked
    showMsgMenu(index) {
      if (!this.msgMenu) {
        this.currentMsg = index;
        // console.log(this.currentMsg);
        // console.log(this.contacts[this.currentChat].messages[index]);
        this.msgMenu = !this.msgMenu;
      } else {
        this.currentMsg = null;
        this.msgMenu = false;
        // console.log(this.currentMsg);
      }
    },
    // show chat options menu when dots are clicked
    showChatOptions() {
      this.chatOptions = !this.chatOptions;
      // console.log(this.chatOptions);
    },
    // delete all the msgs of the current chat
    deleteAllMsg(index) {
      this.msgCount = !this.msgCount;
      console.log(this.contacts[index].messages);
      this.contacts[index].messages
        .splice
        // 0,
        // this.contacts[index].messages.length - 1
        ();
      this.chatOptions = false;
      console.log(this.contacts[index].messages);
    },
    // delete whole object in contacts
    deleteWholeChat(index) {
      this.contacts.splice(index, 1);
      this.chatOptions = false;
    },
    // set the params of scrolling behaviour
    scrollToEnd() {
      const chat = document.querySelector(".chat");
      const scrollHeight = chat.scrollHeight;
      chat.scrollTop = scrollHeight;
    },
    // add new contact into contacts[]
    addNewContact() {
      // create new obj contact
      const newContactObj = {
        name: this.newContactName,
        avatar: this.newContactImg,
      };
      console.log(this.contacts);
      // push the new contact into contacts[]
      this.contacts.push(newContactObj);
      //empty the imput fields
      this.newContactName = "";
      this.newContactImg = "";
      // close the pop up windows
      this.addContactMenu = true;
      this.appMenuVisibility = true;
      console.log(this.appMenuVisibility);
      console.log(this.addContactMenu);
    },
    // show app pop up menu
    showAppMenu() {
      this.appMenuVisibility = !this.appMenuVisibility;
      console.log(this.appMenuVisibility);
    },
    // show new contact pop up window
    showNewContactMenu() {
      this.addContactMenu = !this.addContactMenu;
      console.log(this.addContactMenu);
    },
  },
}).mount("#app");
