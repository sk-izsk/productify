import { SignInButton, useAuth } from "@clerk/react"
import { SendIcon } from "lucide-react"
import React, { useState } from "react"
import { useCreateComment } from "../../hooks/web/useCreateComment"
import { useDeleteComment } from "../../hooks/web/useDeleteComment"
import type { Comment as ProductComment } from "../../types"

interface Props {
  productId?: string
  comments?: ProductComment[]
  currentUserId?: string
}

export const CommentsSection: React.FC<Props> = ({
  productId = "",
  comments = [],
  currentUserId,
}) => {
  const { isSignedIn } = useAuth()
  const [content, setContent] = useState("")
  const createComment = useCreateComment()
  const deleteComment = useDeleteComment(productId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    createComment.mutate(
      { productId, content },
      { onSuccess: () => setContent("") },
    )
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold tracking-tight text-on-surface">Recent Activity & Discussions</h3>
        <span className="text-xs font-bold text-on-surface-variant">{comments.length} Comments</span>
      </div>

      <div className="space-y-8">
        {comments.length === 0 ? (
          <div className="text-center py-12 text-on-surface-variant/50">
            <p className="text-sm font-medium">No activity yet. Be the first to start the discussion.</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high flex items-center justify-center shrink-0 border border-outline-variant/30">
                {comment.users?.imageUrl ? (
                   <img src={comment.users.imageUrl} alt={comment.users.name || ""} className="w-full h-full object-cover" />
                ) : (
                   <span className="font-bold text-sm uppercase text-on-surface-variant">{comment.users?.name?.charAt(0) || "?"}</span>
                )}
              </div>
              <div className="flex-1 space-y-3">
                <div className="bg-surface-container-highest p-4 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-on-surface">{comment.users?.name || "Unknown"}</span>
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-widest">
                       {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {comment.content}
                  </p>
                </div>
                {/* Actions */}
                <div className="flex items-center gap-4 px-2 hover:opacity-100 opacity-70 transition-opacity">
                  <button className="text-[10px] font-bold text-primary uppercase tracking-widest">Helpful</button>
                  {currentUserId === comment.userId && (
                    <button 
                      onClick={() => confirm("Delete comment?") && deleteComment.mutate({ commentId: comment.id })}
                      disabled={deleteComment.isPending}
                      className="text-[10px] font-bold text-error uppercase tracking-widest"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}

        {/* Input Area */}
        <div className="pt-6 border-t border-outline-variant/20">
          {isSignedIn ? (
            <form onSubmit={handleSubmit} className="relative">
              <textarea 
                className="w-full bg-surface-container-low border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none min-h-[100px] text-on-surface placeholder:text-outline/60 resize-none" 
                placeholder="Add your perspective..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={createComment.isPending}
              ></textarea>
              <button 
                type="submit"
                disabled={createComment.isPending || !content.trim()}
                className="absolute bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-lg text-xs font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {createComment.isPending ? "Posting..." : "Post Activity"}
                {!createComment.isPending && <SendIcon className="size-3" />}
              </button>
            </form>
          ) : (
             <div className="bg-surface-container-low rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-3">
               <p className="text-sm font-medium text-on-surface-variant">Sign in to join the conversation.</p>
               <SignInButton mode="modal">
                 <button className="text-sm font-bold text-white bg-primary px-6 py-2 rounded-full hover:bg-primary/90 transition-colors">Sign In</button>
               </SignInButton>
             </div>
          )}
        </div>
      </div>
    </div>
  )
}
