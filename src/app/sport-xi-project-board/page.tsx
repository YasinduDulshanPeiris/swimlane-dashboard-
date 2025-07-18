'use client';
import React, { useState } from 'react';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import Button from '@/components/ui/Button';
interface TaskCard {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  priority: 'Low' | 'Medium' | 'High';
  assignees: string[];
  links: number;
  comments: number;
  dueDate?: string;
  reports?: number;
  hasStream?: boolean;
  hasGroupCall?: boolean;
  hasImage?: boolean;
}
interface BoardColumn {
  id: string;
  title: string;
  color: string;
  tasks: TaskCard[];
}
const SportXiProjectBoard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('In Progress');
  const boardColumns: BoardColumn[] = [
    {
      id: 'todo',
      title: 'To Do',
      color: '#e5e8eb',
      tasks: [
        {
          id: 'task-1',
          title: 'User inerview',
          category: 'Research',
          categoryColor: '#aee753',
          priority: 'Low',
          assignees: ['/images/img_user_profile.svg'],
          links: 2,
          comments: 2,
          dueDate: 'Tomorrow'
        },
        {
          id: 'task-2',
          title: 'Design System',
          category: 'Design',
          categoryColor: '#f80430',
          priority: 'Medium',
          assignees: ['/images/img_user_profile.svg', '/images/img_user_profile.svg'],
          links: 3,
          comments: 8,
          reports: 2
        },
        {
          id: 'task-3',
          title: 'Speech',
          category: 'Other',
          categoryColor: '#777e90',
          priority: 'Low',
          assignees: ['/images/img_user_profile.svg', '/images/img_user_profile.svg', '/images/img_user_profile.svg'],
          links: 1,
          comments: 3,
          hasStream: true
        },
        {
          id: 'task-4',
          title: 'Wireframe',
          category: 'Design',
          categoryColor: '#f80430',
          priority: 'High',
          assignees: ['/images/img_user_profile.svg', '/images/img_user_profile.svg', '/images/img_user_profile.svg'],
          links: 3,
          comments: 8,
          hasStream: true,
          hasImage: true
        }
      ]
    },
    {
      id: 'inprogress',
      title: 'In Progress',
      color: '#ffa800',
      tasks: [
        {
          id: 'task-5',
          title: 'UI Design',
          category: 'Design',
          categoryColor: '#f80430',
          priority: 'High',
          assignees: ['/images/img_user_profile.svg', '/images/img_user_profile.svg'],
          links: 2,
          comments: 2,
          dueDate: 'Tomorrow'
        },
        {
          id: 'task-6',
          title: 'Check Clients Feedback',
          category: 'Feedback',
          categoryColor: '#3772ff',
          priority: 'Low',
          assignees: ['/images/img_user_profile.svg', '/images/img_user_profile.svg', '/images/img_user_profile.svg'],
          comments: 8,
          dueDate: '22 April, 2022',
          hasImage: true
        },
        {
          id: 'task-7',
          title: 'Copyright',
          category: 'Presentation',
          categoryColor: '#ff5b00',
          priority: 'Low',
          assignees: ['/images/img_user_profile.svg'],
          comments: 4,
          dueDate: '22 April, 2022'
        },
        {
          id: 'task-8',
          title: 'Filter sorting',
          category: 'UX Research',
          categoryColor: '#ffa800',
          priority: 'Low',
          assignees: ['/images/img_user_profile.svg', '/images/img_user_profile.svg'],
          links: 1,
          comments: 4,
          hasStream: true
        }
      ]
    },
    {
      id: 'approved',
      title: 'Approved',
      color: '#aee753',
      tasks: [
        {
          id: 'task-9',
          title: 'Prototype',
          category: 'Research',
          categoryColor: '#aee753',
          priority: 'Low',
          assignees: ['/images/img_user_profile.svg', '/images/img_user_profile.svg', '/images/img_user_profile.svg'],
          links: 35,
          comments: 243
        },
        {
          id: 'task-10',
          title: 'Detail Page',
          category: 'Design',
          categoryColor: '#f80430',
          priority: 'Low',
          assignees: ['/images/img_user_profile.svg', '/images/img_user_profile.svg', '/images/img_user_profile.svg'],
          links: 6,
          comments: 28,
          hasImage: true
        },
        {
          id: 'task-11',
          title: 'Animation preloaders',
          category: 'Interface',
          categoryColor: '#353945',
          priority: 'High',
          assignees: ['/images/img_user_profile.svg'],
          links: 4,
          comments: 9
        },
        {
          id: 'task-12',
          title: 'Sorting category',
          category: 'UX Research',
          categoryColor: '#ffa800',
          priority: 'High',
          assignees: ['/images/img_user_profile.svg', '/images/img_user_profile.svg', '/images/img_user_profile.svg'],
          hasImage: true
        }
      ]
    },
    {
      id: 'reject',
      title: 'Reject',
      color: '#f80430',
      tasks: [
        {
          id: 'task-13',
          title: 'Group Management',
          category: 'Other',
          categoryColor: '#777e90',
          priority: 'Low',
          assignees: ['/images/img_user_profile.svg'],
          comments: 329,
          hasGroupCall: true
        },
        {
          id: 'task-14',
          title: 'Design System',
          category: 'Design',
          categoryColor: '#f80430',
          priority: 'Low',
          assignees: ['/images/img_user_profile.svg'],
          links: 3,
          comments: 8,
          reports: 2
        },
        {
          id: 'task-15',
          title: 'Slider controls',
          category: 'Interface',
          categoryColor: '#353945',
          priority: 'Low',
          assignees: ['/images/img_user_profile.svg', '/images/img_user_profile.svg'],
          links: 8,
          comments: 31
        },
        {
          id: 'task-16',
          title: 'Slider controls',
          category: 'Design',
          categoryColor: '#353945',
          priority: 'Low',
          assignees: ['/images/img_user_profile.svg', '/images/img_user_profile.svg', '/images/img_user_profile.svg'],
          links: 3,
          comments: 8,
          hasImage: true
        }
      ]
    }
  ];
  const TaskCard: React.FC<{ task: TaskCard }> = ({ task }) => {
    const getPriorityIcon = () => '/images/img_icons_flash.svg';
    const renderAssignees = () => {
      const maxVisible = 3;
      const visibleAssignees = task.assignees.slice(0, maxVisible);
      const remainingCount = task.assignees.length - maxVisible;
      return (
        <div className="flex items-center -space-x-2">
          {visibleAssignees.map((assignee, index) => (
            <div
              key={index}
              className="w-5 h-5 bg-[#353945] border border-white rounded-[10px] flex items-center justify-center"
            >
              <img src={assignee} alt="Assignee" className="w-3 h-3" />
            </div>
          ))}
          {remainingCount > 0 && (
            <div className="w-5 h-5 bg-[#e5e8eb] border border-white rounded-[10px] flex items-center justify-center">
              <span className="text-[9px] font-semibold text-[#353945] font-poppins leading-[13px]">
                +{remainingCount}
              </span>
            </div>
          )}
        </div>
      );
    };
    return (
      <div className="bg-white border border-[#e5e8eb] rounded-xl p-3 mb-3.5 hover:shadow-md transition-shadow">
        {/* Category Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div 
              className="w-2 h-2 rounded-sm"
              style={{ backgroundColor: task.categoryColor }}
            />
            <span className="text-xs font-normal text-[#b0b4c3] font-poppins leading-[18px]">
              {task.category}
            </span>
          </div>
          <img src="/images/img_group_blue_gray_200.svg" alt="Options" className="w-3.5 h-3.5" />
        </div>
        {/* Task Title */}
        <h3 className="text-sm font-medium text-black font-poppins leading-[21px] mb-2.5">
          {task.title}
        </h3>
        {/* Assignees and Priority */}
        <div className="flex items-center justify-between mb-8">
          {renderAssignees()}
          <div className="flex items-center gap-1 bg-[#f4f5f6] rounded-md px-1 py-1">
            <img src={getPriorityIcon()} alt="Priority" className="w-3 h-3" />
            <span className="text-[8px] font-medium text-[#b0b4c3] font-poppins leading-3">
              {task.priority}
            </span>
          </div>
        </div>
        {/* Image Placeholder */}
        {task.hasImage && (
          <div className="w-full h-[76px] bg-[#353945] rounded mb-3.5 flex items-center justify-center">
            <img src="/images/img_user_profile.svg" alt="Content" className="w-3.5 h-3.5" />
          </div>
        )}
        {/* Divider */}
        <div className="w-full h-px bg-[#e5e8eb] mb-1" />
        {/* Footer Stats */}
        <div className="flex items-center justify-between text-xs font-medium text-[#777e90] font-poppins leading-[18px]">
          <div className="flex items-center gap-3">
            {task.links && (
              <div className="flex items-center gap-1">
                <img src="/images/img_icons_link.svg" alt="Links" className="w-4 h-4" />
                <span>{task.links}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <img src="/images/img_icons_message.svg" alt="Comments" className="w-4 h-4" />
              <span>{task.comments}</span>
            </div>
            {task.dueDate && (
              <div className="flex items-center gap-1">
                <img src="/images/img_icons_calendar.svg" alt="Due date" className="w-4 h-4" />
                <span>Due: {task.dueDate}</span>
              </div>
            )}
            {task.reports && (
              <div className="flex items-center gap-1">
                <img src="/images/img_icons_info_circle_red_a400.svg" alt="Reports" className="w-4 h-4" />
                <span className="text-[#f80430]">{task.reports} Reports</span>
              </div>
            )}
            {task.hasStream && (
              <div className="flex items-center gap-1">
                <img src="/images/img_group_blue_a400.svg" alt="Stream" className="w-4 h-4" />
                <span className="text-[#3772ff]">Stream</span>
              </div>
            )}
            {task.hasGroupCall && (
              <div className="flex items-center gap-1">
                <img src="/images/img_group_blue_a400.svg" alt="Group Call" className="w-4 h-4" />
                <span className="text-[#3772ff]">Group Call</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  const BoardColumn: React.FC<{ column: BoardColumn }> = ({ column }) => (
    <div className="flex-1 min-w-[260px]">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-7">
        <Button
          variant="secondary"
          size="sm"
          className="rounded-[14px] px-6 py-1 text-sm font-medium text-[#353945] font-poppins leading-[21px]"
          style={{ backgroundColor: column.color }}
        >
          {column.title}
        </Button>
        <div className="flex items-center gap-1">
          <img src="/images/img_icons_plus_2_gray_800.svg" alt="Add" className="w-5 h-5 cursor-pointer" />
          <img src="/images/img_group_gray_800.svg" alt="Options" className="w-5 h-5 cursor-pointer" />
        </div>
      </div>
      {/* Tasks */}
      <div className="space-y-3.5">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <Header />
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />
        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-6 overflow-x-auto">
          {/* Project Header */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-1.5">
              <h1 className="text-2xl font-semibold text-[#131416] font-poppins leading-9">
                Sport Xi Project
              </h1>
              <div className="bg-[#ffa800] rounded-md px-3 py-2">
                <span className="text-[10px] font-medium text-[#353945] font-poppins leading-[15px]">
                  In progress
                </span>
              </div>
            </div>
            <p className="text-base font-normal text-[#b0b4c3] font-poppins leading-6 mb-4">
              event production
            </p>
            {/* Assigned Team */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-4 mb-6">
              <span className="text-base font-normal text-[#b0b4c3] font-poppins leading-6">
                assigned
              </span>
              <div className="flex items-center -space-x-2">
                <div className="w-6 h-6 bg-[#353945] border border-white rounded-xl flex items-center justify-center">
                  <img src="/images/img_user_profile.svg" alt="Team member" className="w-4 h-4" />
                </div>
                <div className="w-6 h-6 bg-[#353945] border border-white rounded-xl flex items-center justify-center">
                  <img src="/images/img_user_profile.svg" alt="Team member" className="w-4 h-4" />
                </div>
                <div className="w-6 h-6 bg-[#353945] border border-white rounded-xl flex items-center justify-center">
                  <img src="/images/img_user_profile.svg" alt="Team member" className="w-4 h-4" />
                </div>
                <div className="w-6 h-6 bg-[#e5e8eb] border border-white rounded-xl flex items-center justify-center">
                  <span className="text-[9px] font-semibold text-[#353945] font-poppins leading-[13px]">
                    +2
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border border-[#e5e8eb] bg-white rounded-[14px] px-3 py-1 flex items-center gap-2.5 text-xs font-medium text-[#b0b4c3] font-poppins leading-[18px]"
              >
                Manage
                <img src="/images/img_icons_pencil.svg" alt="Edit" className="w-4 h-4" />
              </Button>
            </div>
            {/* Divider and Last Updated */}
            <div className="w-full h-px bg-[#e5e8eb] mb-4" />
            <p className="text-sm font-normal text-[#b0b4c3] font-poppins leading-[21px] ml-1">
              Last updated on: 04 April, 2022
            </p>
          </div>
          {/* Board Columns */}
          <div className="relative">
            {/* Background Table Image */}
            <div className="absolute inset-0 flex justify-center">
              <img 
                src="/images/img_table_body.svg" 
                alt="Board background" 
                className="w-full max-w-[1152px] h-[724px] object-cover"
              />
            </div>
            {/* Board Content */}
            <div className="relative z-10 p-3">
              <div className="flex flex-col lg:flex-row gap-7 overflow-x-auto">
                {boardColumns.map((column) => (
                  <BoardColumn key={column.id} column={column} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default SportXiProjectBoard;