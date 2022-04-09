// 接口定义

// 头部 登录状态
export interface IUserProps {
  status: boolean;
  name?:string;
  id?:string,
  columnId?:number
}
export const UserMsg: IUserProps = {
  name: 'zjj',
  status: false,
  id: '1',
  columnId: 1
}
export interface IImg{
  _id?:string,
  url?:string,
  createdAt?:string
}
// 专栏列表
export interface IColumnProps{
    _id: string;
    title: string;
    avatar?: IImg;
    description: string;
}

// 点击详情->专栏列表
export interface IPostProps {
    _id: string;
    title: string;
    excerpt?:string;
    content?: string;
    image?: IImg;
    createdAt: string;
    column: string;
}
