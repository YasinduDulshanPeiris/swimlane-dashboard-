'use client';
import { useEffect, useState } from 'react';
import { useTaskStore } from '@/store/taskStore';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
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
  links?: number;
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
  const { columns, filteredColumns, setColumns, moveTask, searchTasks } = useTaskStore();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('/data/tasks.json');
        if (!response.ok) throw new Error('Failed to fetch tasks');
        const data = await response.json();
        setColumns(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, [setColumns]);

  useEffect(() => {
    searchTasks(searchQuery);
  }, [searchQuery, searchTasks]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    moveTask(draggableId, source.droppableId, destination.droppableId);
  };

  const TaskCard: React.FC<{ task: TaskCard; index: number }> = ({ task, index }) => {
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
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="bg-white border border-[#e5e8eb] rounded-xl p-3 mb-3.5 hover:shadow-md transition-shadow"
          >
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
            <h3 className="text-sm font-medium text-black font-poppins leading-[21px] mb-2.5">
              {task.title}
            </h3>
            <div className="flex items-center justify-between mb-8">
              {renderAssignees()}
              <div className="flex items-center gap-1 bg-[#f4f5f6] rounded-md px-1 py-1">
                <img src={getPriorityIcon()} alt="Priority" className="w-3 h-3" />
                <span className="text-[8px] font-medium text-[#b0b4c3] font-poppins leading-3">
                  {task.priority}
                </span>
              </div>
            </div>
            {task.hasImage && (
              <div className="w-full h-[76px] bg-[#353945] rounded mb-3.5 flex items-center justify-center">
                <img src="/images/img_user_profile.svg" alt="Content" className="w-3.5 h-3.5" />
              </div>
            )}
            <div className="w-full h-px bg-[#e5e8eb] mb-1" />
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
        )}
      </Draggable>
    );
  };

  const BoardColumn: React.FC<{ column: BoardColumn }> = ({ column }) => (
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div
          className="flex-1 min-w-[260px]"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
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
          <div className="space-y-3.5">
            {column.tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-6 overflow-x-auto">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md p-2 border border-[#e5e8eb] rounded-md text-sm font-poppins text-[#353945] focus:outline-none focus:ring-2 focus:ring-[#3772ff]"
            />
          </div>
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
            <div className="w-full h-px bg-[#e5e8eb] mb-4" />
            <p className="text-sm font-normal text-[#b0b4c3] font-poppins leading-[21px] ml-1">
              Last updated on: 04 April, 2022
            </p>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="relative">
              <div className="absolute inset-0 flex justify-center">
                <img
                  src="/images/img_table_body.svg"
                  alt="Board background"
                  className="w-full max-w-[1152px] h-[724px] object-cover"
                />
              </div>
              <div className="relative z-10 p-3">
                <div className="flex flex-col md:flex-row gap-7 overflow-x-auto">
                  {filteredColumns.map((column) => (
                    <BoardColumn key={column.id} column={column} />
                  ))}
                </div>
              </div>
            </div>
          </DragDropContext>
        </main>
      </div>
    </div>
  );
};

export default SportXiProjectBoard;