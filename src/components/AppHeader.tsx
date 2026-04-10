import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTaskStore } from '@/store/taskStore';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Plus, Bell, Moon, Sun } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CreateTaskDialog } from '@/components/CreateTaskDialog';
import { useState } from 'react';

export function AppHeader() {
  const { searchQuery, setSearchQuery, filterPriority, setFilterPriority } = useTaskStore();
  const [createOpen, setCreateOpen] = useState(false);
  
  
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  const priorities = [
    { value: null, label: 'All priorities' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];

  return (
    <>
      <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
          <div className="hidden h-5 w-px bg-border sm:block" />
          <h1 className="hidden text-sm font-semibold text-foreground sm:block">Sprint 24</h1>
          <Badge variant="secondary" className="hidden text-xs sm:inline-flex">
            10 issues
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 w-44 pl-8 text-xs sm:w-56"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
                <Filter className="h-3.5 w-3.5" />
                {filterPriority ? filterPriority : 'Filter'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {priorities.map((p) => (
                <DropdownMenuItem key={p.label} onClick={() => setFilterPriority(p.value)}>
                  {p.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          
          <Button variant="ghost" size="sm" className="relative h-8 w-8 p-0" onClick={toggleTheme}>
            {isDark ? <Sun className="h-4 w-4 text-muted-foreground" /> : <Moon className="h-4 w-4 text-muted-foreground" />}
          </Button>

          <Button variant="ghost" size="sm" className="relative h-8 w-8 p-0">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" />
          </Button>

          <Button size="sm" className="h-8 gap-1.5 text-xs" onClick={() => setCreateOpen(true)}>
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Create</span>
          </Button>
        </div>
      </header>

      <CreateTaskDialog open={createOpen} onOpenChange={setCreateOpen} />
    </>
  );
}