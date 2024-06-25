from pydantic import BaseModel,EmailStr

#base schema for user
class UserBase(BaseModel):
    username:str
    email:EmailStr

#schema for creating a new user
class UserCreate(UserBase):
    password:str

#schema for displaying
class User(UserBase):
    id:int

    class Config:
        orm_model = True

#schemas for user login
class UserLogin(BaseModel):
    email:EmailStr

class Token(BaseModel):
    access_token: str
    token_type :str