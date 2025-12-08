import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <main class="main-container">
      <header>
        <h1>🧾 Budget RAG</h1>
        <p>AI-Powered Receipt Processor</p>
        <nav>
          <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
          <a routerLink="/upload" routerLinkActive="active">Upload Receipt</a>
        </nav>
      </header>
      
      <div class="content-area">
        <router-outlet></router-outlet>
      </div>
    </main>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: #f3f4f6;
    }

    .main-container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem;
      box-sizing: border-box;

      @media (min-width: 768px) {
        padding: 2rem;
      }
    }

    header {
      text-align: center;
      margin-bottom: 2rem;
      
      h1 { 
        margin: 0; 
        font-size: 2rem; 
        background: linear-gradient(135deg, #2563eb, #db2777);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        line-height: 1.2;

        @media (min-width: 768px) {
            font-size: 2.5rem;
        }
      }
      
      p { color: #6b7280; font-size: 1rem; margin-bottom: 1.5rem; }

      nav {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        flex-wrap: wrap;
        
        a {
          text-decoration: none;
          color: #4b5563;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 999px;
          transition: all 0.2s;
          font-size: 0.9rem;
          
          &:hover {
            background: #e5e7eb;
            color: #111827;
          }

          &.active {
            background: #2563eb;
            color: white;
          }

          @media (min-width: 768px) {
            font-size: 1rem;
            gap: 1rem;
          }
        }
      }
    }

    .content-area {
      animation: fadeIn 0.3s ease-in-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class AppComponent {
  title = 'budget-app-client';
}
