import { RefresherService } from './../../services/refresher.service';
import { EventService } from './../../services/event.service';
import { EventDetailsPage } from './../event-details/event-details';
import { Event } from './../../model/event';
import { Comment } from './../../model/comment';
import { CommentService} from './../../services/comment.service';
import { UserService } from './../../services/users.service';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController, AlertController, ToastController } from 'ionic-angular';
import { ProfilePage} from './../profile/profile';

@Component({
  selector: 'comment',
  templateUrl: 'comment.html'
})
export class CommentPage {
  text:String;
  id:String;
  selectedItem: any;
  isEdited: boolean = false;
  comments: Comment[];
  loader;
  private failedFetch;

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    public navParams:NavParams,
    public eventService: EventService,
    public userService: UserService,
    public commentService:CommentService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private refresherService: RefresherService
    ) {
    this.selectedItem = navParams.get('item');
     if (!this.contentsLoaded()) {
      this.createAndPresentLoader();
    } 
    this.fetchComments(); 
    }
  fetchComments() {
    this.commentService.getAllComments(this.selectedItem.id).subscribe(response => {
      this.comments = [];
      response.comment.forEach(res => {
         this.comments.push(new Comment(
          res._id,
          res.userBrief.author,
          res.userBrief.authorId,
          res.text));
      }) 
        if(this.contentsLoaded()) {
        this.loader.dismiss();
      }     
    }, err => {
     this.failedFetch = true;
     console.log(err);
    })
  }

  createAndPresentLoader() {
    this.loader = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Loading Please Wait...'
    });
    this.loader.present();
  }

  addComment(){
  let successMessage = "added comment";
  let errorMessage = "Failed to add comment";
  if(this.text){
  this.commentService
      .addComment(this.text, this.selectedItem.id,JSON.parse(localStorage.getItem('userData'))).subscribe(res => {
        let toast = this.toastCtrl.create({
        message: successMessage,
        duration: 3000,
        position: 'top'
      })
      toast.present();
        this.fetchComments();
        this.text="";
      },
      err => {
        let alert = this.alertCtrl.create({
          title: 'Error !',
          subTitle: errorMessage,
          buttons: ['OK']
        });
        alert.present();
      }
      );}
  }

  edit(id,text){
    this.text=text;
    this.isEdited = true;
    this.id=id;
  }

  editComment(){
    if(this.text){
  this.commentService
      .editComment(this.text, this.id,JSON.parse(localStorage.getItem('userData'))).subscribe(res => {
        this.fetchComments();
        this.text="";
        this.isEdited=false;
      },
      err => {
        console.log(err);
      }
      );}
  } 
  
  updateCommentCount(){
   this.commentService
       .updateCount(this.selectedItem.id).subscribe(res => {
       },
      err => {
        console.log(err);
      });
  }

  deleteComment(id){
  let successMessage = "Comment Deleted";
  let errorMessage = "Failed to delete comment";
  this.createAndPresentLoader();
  this.commentService
      .deleteComment(id).subscribe(res => {
       let toast = this.toastCtrl.create({
        message: successMessage,
        duration: 3000,
        position: 'top'
      })
      toast.present();
      this.fetchComments();
       this.text="";
       this.isEdited=false;
       this.updateCommentCount();
      },
      err => {
        let alert = this.alertCtrl.create({
          title: 'Error !',
          subTitle: errorMessage,
          buttons: ['OK']
        });
        alert.present();
      }
      );     
  } 
  reply(author){
    let recepient=author;  
    this.text="@"+recepient;
  } 
  contentsLoaded() {
    return this.comments;
  }
  isUsersProfile(id) {
    return id === JSON.parse(localStorage.getItem('userData'))._id;
  }
  displayProfile(id) {
    this.navCtrl.push(ProfilePage, {
      id: id
    })
  }
}
