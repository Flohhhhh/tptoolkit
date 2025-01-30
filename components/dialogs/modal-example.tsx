// file: src/modals/modal-example.tsx
import { DialogContent } from '@/components/ui/dialog' // shadcn dialog

// or any of the below
// import { SheetContent } from '@/ui/sheet' // shadcn sheet
// import { DrawerContent } from '@/ui/drawer' // shadcn drawer

export default function ModalExample({ foo }: { foo: string }) {
  return (
    <DialogContent>
      Your modal
    </DialogContent>
  )
}