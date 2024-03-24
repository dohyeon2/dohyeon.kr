import { CSR } from "@/components/util/CSR";
import { Collapse } from "@/components/util/collapse";
import { day } from "@/lib/external/dayjs";
import { Comment } from "@/lib/internal/comment/comment.interface";

interface CommentItemProps {
    data: Comment;
}

export const CommentItem: React.FC<CommentItemProps> = ({ data }) => {
    return (
        <div>
            <Collapse>
                {({ Trigger, Content }) => (
                    <>
                        <div className="flex justify-between">
                            <div>{data.author.name}</div>
                            <CSR>
                                <div>
                                    {day(data.updatedAt).format(
                                        "YYYY.MM.DD HH:mm"
                                    )}
                                </div>
                            </CSR>
                        </div>
                        <div className="flex">
                            <div className="flex-1">{data.content}</div>
                            <div className="flex-none">
                                <Trigger>메뉴</Trigger>
                            </div>
                        </div>
                        <Content>
                            <div className="flex gap-2">
                                <div>답글달기</div>
                                <div>수정</div>
                                <div>삭제</div>
                            </div>
                        </Content>
                    </>
                )}
            </Collapse>
        </div>
    );
};
