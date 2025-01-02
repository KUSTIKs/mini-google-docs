'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TextIcon,
  TrashIcon,
  UnderlineIcon,
  Undo2Icon,
} from 'lucide-react';
import { BsFilePdf } from 'react-icons/bs';
import { ClientSideSuspense } from '@liveblocks/react';
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';

import { DocumentTitle } from './document-title';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { useEditorStore } from '@/store/use-editor-store';
import { AvatarsStack } from './avatars-stack';

const Navbar = () => {
  const { editor } = useEditorStore();

  const printPage = () => {
    window.print();
  };

  const undo = () => {
    editor?.chain().focus().undo().run();
  };
  const redo = () => {
    editor?.chain().focus().redo().run();
  };

  const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    const options = { rows, cols, withHeaderRow: false };
    editor?.chain().focus().insertTable(options).run();
  };

  const toggleBold = () => {
    editor?.chain().focus().toggleBold().run();
  };
  const toggleItalic = () => {
    editor?.chain().focus().toggleItalic().run();
  };
  const toggleUnderline = () => {
    editor?.chain().focus().toggleUnderline().run();
  };
  const toggleStrike = () => {
    editor?.chain().focus().toggleStrike().run();
  };
  const clearFormatting = () => {
    editor?.chain().focus().unsetAllMarks().run();
  };

  const downloadFile = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;

    anchor.click();
  };

  const downloadJson = () => {
    if (!editor) return;

    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content)], {
      type: 'application/json',
    });

    downloadFile(blob, 'document.json');
  };
  const downloadHtml = () => {
    if (!editor) return;

    const content = editor.getHTML();
    const blob = new Blob([content], {
      type: 'text/html',
    });

    downloadFile(blob, 'document.html');
  };
  const downloadText = () => {
    if (!editor) return;

    const content = editor.getText();
    const blob = new Blob([content], {
      type: 'text/plain',
    });

    downloadFile(blob, 'document.txt');
  };
  const downloadPdf = () => {
    printPage();
  };

  return (
    <nav className='flex items-center justify-between'>
      <div className='flex gap-2 items-center'>
        <Link href='/'>
          <Image src='/logo.svg' alt='logo' width={36} height={36} priority />
        </Link>
        <div className='flex flex-col'>
          <DocumentTitle />
          <div className='flex'>
            <Menubar className='border-none bg-transparent shadow-none h-auto p-0'>
              <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                  File
                </MenubarTrigger>
                <MenubarContent className='print:hidden'>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <FileIcon className='size-4 mr-2' />
                      Save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={downloadJson}>
                        <FileJsonIcon className='size-4 mr-2' />
                        JSON
                      </MenubarItem>
                      <MenubarItem onClick={downloadHtml}>
                        <GlobeIcon className='size-4 mr-2' />
                        HTML
                      </MenubarItem>
                      <MenubarItem onClick={downloadPdf}>
                        <BsFilePdf className='size-4 mr-2' />
                        PDF
                      </MenubarItem>
                      <MenubarItem onClick={downloadText}>
                        <FileTextIcon className='size-4 mr-2' />
                        Text
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>

                  <MenubarItem>
                    <FilePlusIcon className='size-4 mr-2' />
                    New Document
                  </MenubarItem>

                  <MenubarSeparator />

                  <MenubarItem>
                    <FilePenIcon className='size-4 mr-2' />
                    Rename
                  </MenubarItem>
                  <MenubarItem>
                    <TrashIcon className='size-4 mr-2' />
                    Remove
                  </MenubarItem>

                  <MenubarSeparator />

                  <MenubarItem onClick={printPage}>
                    <PrinterIcon className='size-4 mr-2' />
                    Print
                    <MenubarShortcut>Ctrl+P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                  Edit
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={undo}>
                    <Undo2Icon className='size-4 mr-2' />
                    Undo
                    <MenubarShortcut>Ctrl+Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem onClick={redo}>
                    <Redo2Icon className='size-4 mr-2' />
                    Redo
                    <MenubarShortcut>Ctrl+Y</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                  Insert
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>Table</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        onClick={() => insertTable({ rows: 1, cols: 1 })}
                      >
                        1 x 1
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => insertTable({ rows: 2, cols: 2 })}
                      >
                        2 x 2
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => insertTable({ rows: 3, cols: 3 })}
                      >
                        3 x 3
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => insertTable({ rows: 4, cols: 4 })}
                      >
                        4 x 4
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                  Format
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TextIcon className='size-4 mr-2' />
                      Text
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={toggleBold}>
                        <BoldIcon className='size-4 mr-2' />
                        Bold
                        <MenubarShortcut>Ctrl+B</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem onClick={toggleItalic}>
                        <ItalicIcon className='size-4 mr-2' />
                        Italic
                        <MenubarShortcut>Ctrl+I</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem onClick={toggleUnderline}>
                        <UnderlineIcon className='size-4 mr-2' />
                        <span className='mr-2'>Underline</span>
                        <MenubarShortcut>Ctrl+U</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem onClick={toggleStrike}>
                        <StrikethroughIcon className='size-4 mr-2' />
                        <span className='mr-2'>Strikethrough</span>
                        <MenubarShortcut>Ctrl+S</MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>

                  <MenubarItem onClick={clearFormatting}>
                    <RemoveFormattingIcon className='size-4 mr-2' />
                    Crear formatting
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>

      <div className='flex-1 flex items-center justify-end gap-2'>
        <ClientSideSuspense fallback={null}>
          <AvatarsStack />
        </ClientSideSuspense>
        <OrganizationSwitcher
          afterCreateOrganizationUrl='/'
          afterLeaveOrganizationUrl='/'
          afterSelectOrganizationUrl='/'
          afterSelectPersonalUrl='/'
        />
        <UserButton />
      </div>
    </nav>
  );
};

export { Navbar };
