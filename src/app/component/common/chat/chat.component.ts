import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SingletonStoreService } from '../../../core/services/helper/singleton-store.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
    ]
})
export class ChatComponent {
  conversationData = [
    {
      id: 1,
      name: "Emily Johnson",
      title: "Dr.",
      message: "Patient records updated",
      timestamp: "10:23 AM",
      unreadCount: 1,
      image: "https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520a%2520female%2520with%2520short%2520brown%2520hair%252C%2520smiling%252C%2520professional%2520attire%252C%2520neutral%2520background%252C%2520high%2520quality%2520portrait&width=50&height=50&seq=1&orientation=squarish"
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Dr.",
      message: "Lab results review completed",
      timestamp: "9:45 AM",
      unreadCount: 0,
      image: "https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520an%2520asian%2520male%2520doctor%2520with%2520glasses%252C%2520confident%2520smile%252C%2520white%2520coat%252C%2520neutral%2520background%252C%2520high%2520quality%2520portrait&width=50&height=50&seq=2&orientation=squarish"
    },
    {
      id: 3,
      name: "Sarah Williams",
      title: "",
      message: "Shift schedule confirmed",
      timestamp: "9:15 AM",
      unreadCount: 0,
      image: "https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520an%2520african%2520american%2520female%2520nurse%252C%2520warm%2520smile%252C%2520scrubs%252C%2520neutral%2520background%252C%2520high%2520quality%2520portrait&width=50&height=50&seq=3&orientation=squarish"
    },
    {
      id: 4,
      name: "Amir Patel",
      title: "Dr.",
      message: "Emergency consultation needed",
      timestamp: "8:30 AM",
      unreadCount: 1,
      image: "https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520a%2520middle%2520eastern%2520male%2520doctor%252C%2520confident%2520expression%252C%2520professional%2520attire%252C%2520neutral%2520background%252C%2520high%2520quality%2520portrait&width=50&height=50&seq=4&orientation=squarish"
    }
  ];
  selectedUser: any = this.conversationData[0]; // Initialize selectedUser with the first conversation in the array
    
  constructor(
    private router: Router,
    private singletonStoreService: SingletonStoreService,
  ) { 
    this.singletonStoreService.breadCrumbItems.next([
      { label: 'Chat', active: true },
    ]); 
  }

  selectConversation(user: any) {
    this.selectedUser = user;
  }

  action(route: string) {
    this.router.navigateByUrl(route);
  }
}
