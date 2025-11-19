'use client';

import { AgentAction } from './types';

export function createActionHandler() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Add highlight effect
      element.classList.add('ring-2', 'ring-primary', 'ring-offset-2');
      setTimeout(() => {
        element.classList.remove('ring-2', 'ring-primary', 'ring-offset-2');
      }, 2000);
    }
  };

  const showProject = (projectId: string) => {
    // Scroll to projects section first
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Then highlight specific project after scroll
    setTimeout(() => {
      const projectElement = document.querySelector(`[data-project-id="${projectId}"]`);
      if (projectElement) {
        projectElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        projectElement.classList.add('ring-2', 'ring-primary', 'ring-offset-2', 'scale-[1.02]');
        setTimeout(() => {
          projectElement.classList.remove('ring-2', 'ring-primary', 'ring-offset-2', 'scale-[1.02]');
        }, 3000);
      }
    }, 500);
  };

  const openContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Focus on first input after scroll
      setTimeout(() => {
        const firstInput = contactSection.querySelector('input');
        if (firstInput) {
          firstInput.focus();
        }
      }, 800);
    }
  };

  const downloadResume = () => {
    // Create a link to download resume
    // You'll need to add your resume file to the public folder
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Muhammad_Idris_Abubakar_Resume.pdf';
    link.click();
  };

  const bookMeeting = () => {
    // Open calendar link in new tab
    // Replace with actual Calendly or similar link
    window.open('https://calendly.com/your-link', '_blank');
  };

  const filterProjects = (technology: string) => {
    // Scroll to projects and emit filter event
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Dispatch custom event for filtering
      const event = new CustomEvent('filterProjects', { detail: { technology } });
      window.dispatchEvent(event);
    }
  };

  const highlightSkill = (skillName: string) => {
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

      setTimeout(() => {
        const skillElement = document.querySelector(`[data-skill="${skillName}"]`);
        if (skillElement) {
          skillElement.classList.add('bg-primary/20', 'scale-105');
          setTimeout(() => {
            skillElement.classList.remove('bg-primary/20', 'scale-105');
          }, 2000);
        }
      }, 500);
    }
  };

  return (action: AgentAction) => {
    switch (action.type) {
      case 'scroll_to_section':
      case 'navigate':
        if (action.payload?.section) {
          scrollToSection(action.payload.section);
        }
        break;

      case 'show_project':
        if (action.payload?.projectId) {
          showProject(action.payload.projectId);
        }
        break;

      case 'open_contact':
        openContact();
        break;

      case 'download_resume':
        downloadResume();
        break;

      case 'book_meeting':
        bookMeeting();
        break;

      case 'filter_projects':
        if (action.payload?.technology) {
          filterProjects(action.payload.technology);
        }
        break;

      case 'highlight_skill':
        if (action.payload?.skill) {
          highlightSkill(action.payload.skill);
        }
        break;

      default:
        console.warn('Unknown action type:', action.type);
    }
  };
}
