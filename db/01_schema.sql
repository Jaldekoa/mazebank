BEGIN;


CREATE TABLE IF NOT EXISTS public."Accounts"
(
    id serial NOT NULL,
    "userId" integer NOT NULL,
    "accountName" character varying COLLATE pg_catalog."default" NOT NULL,
    "accountNumber" character varying COLLATE pg_catalog."default" NOT NULL,
    balance numeric NOT NULL DEFAULT 0.00,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Accounts_pkey" PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS public."Transactions"
(
    id serial NOT NULL,
    "senderAccountId" integer,
    "receiverAccountId" integer,
    amount numeric NOT NULL,
    "details" character varying COLLATE pg_catalog."default",
	"type" character varying COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Transactions_pkey" PRIMARY KEY (id),

    CONSTRAINT check_transaction_logic CHECK (
        (type = 'DEPOSIT' AND "senderAccountId" IS NULL AND "receiverAccountId" IS NOT NULL) OR
        (type = 'WITHDRAWAL' AND "senderAccountId" IS NOT NULL AND "receiverAccountId" IS NULL) OR
        (type = 'TRANSFER' AND "senderAccountId" IS NOT NULL AND "receiverAccountId" IS NOT NULL)
    )
);

CREATE TABLE IF NOT EXISTS public."Users"
(
    id serial NOT NULL,
    dni character varying COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    "firstName" character varying COLLATE pg_catalog."default" NOT NULL,
    "lastName" character varying COLLATE pg_catalog."default" NOT NULL,
    email character varying COLLATE pg_catalog."default",
    "phoneNumber" character varying COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Users_pkey" PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."Accounts"
    ADD CONSTRAINT fk_user_account FOREIGN KEY ("userId")
    REFERENCES public."Users" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public."Transactions"
    ADD CONSTRAINT fk_receiver FOREIGN KEY ("receiverAccountId")
    REFERENCES public."Accounts" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public."Transactions"
    ADD CONSTRAINT fk_sender FOREIGN KEY ("senderAccountId")
    REFERENCES public."Accounts" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

END;