DROP TABLE IF EXISTS todo_items;
DROP TABLE IF EXISTS accounts;

DROP SEQUENCE IF EXISTS todo_items_pk;
DROP SEQUENCE IF EXISTS accounts_pk;

-- CREATE primary key SEQUENCES	=	=	=	=	=	=	=	=	=	=
-- Note that all Primary Key sequences start at 100. PK ids < 100
-- are reserved for test data
CREATE SEQUENCE public.accounts_pk
   	INCREMENT 1
    START 100
    MINVALUE 1
;

CREATE SEQUENCE public.todo_items_pk
   	INCREMENT 1
    START 100
    MINVALUE 1
;



-- CREATE TABLES	=	=	=	=	=	=	=	=	=	=	=	=	=
CREATE TABLE public.accounts
(
	id integer NOT NULL DEFAULT nextval('accounts_pk'),
	email text,
	password text,
	password_salt text,
	PRIMARY KEY (id)
);

CREATE TABLE public.todo_items
(
	id integer NOT NULL DEFAULT nextval('todo_items_pk'),
	account_id integer,
	todo_text text,
	completion_time integer,
	due_date timestamp,
	priority integer, 
	PRIMARY KEY (id),
	FOREIGN KEY (account_id) REFERENCES public.accounts (id)
);


-- INSERT test data =	=	=	=	=	=	=	=	=	=	=	=	=
INSERT INTO public.accounts 
	(id, email, password, password_salt)
	VALUES (1, 'test@test.com', '9ba1f63365a6caf66e46348f43cdef956015bea997adeb06e69007ee3ff517df10fc5eb860da3d43b82c2a040c931119d2dfc6d08e253742293a868cc2d82015', 'test');

INSERT INTO public.todo_items 
	(id, account_id, todo_text, completion_time, priority)
	VALUES(1,1,'Wash Laundry', 30,5);

INSERT INTO public.todo_items 
	(id, account_id, todo_text, completion_time, priority)
	VALUES(2,1,'Go Shopping', 75,3);

INSERT INTO public.todo_items 
	(id, account_id, todo_text, completion_time, priority)
	VALUES(3,1,'Slaughter Heathens', 240,1);