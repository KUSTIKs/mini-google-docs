'use client';

import { Separator } from '@/components/ui/separator';
import { Tool } from './tools/tool';

const Toolbar = () => {
  return (
    <div className='bg-[#f1f4f9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto'>
      <Tool.Undo />
      <Tool.Redo />
      <Tool.Print />
      <Tool.SpellCheck />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      <Tool.FontFamily />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      <Tool.Heading />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      <Tool.Bold />
      <Tool.Italic />
      <Tool.Underline />
      <Tool.TextColor />
      <Tool.HightlightColor />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      <Tool.Link />
      <Tool.Image />
      <Tool.Alignment />
      <Tool.List />
      <Tool.Comment />
      <Tool.ListTodo />
      <Tool.RemoveFormatting />
    </div>
  );
};

export { Toolbar };
