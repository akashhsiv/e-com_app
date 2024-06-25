from sqlalchemy import Column,Integer,String,create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL="sqllite:///./test.db"

Base = declarative_base

class User(Base):
    __tablename__ = "users"

    id =Column(Integer,primary_key=True,Index=True)
    username = Column(String, unique=True, Index=True)
    email = Column(String, unique=True, Index=True)
    hashed_password = Column(String)

    engine = create_engine(DATABASE_URL)
    Sessionlocal = sessionmaker(autocommit =False,autoflush=False,bind=engine)

    Base.metadate.create_all(bind=engine)


