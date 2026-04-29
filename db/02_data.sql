BEGIN;

-- 1. POBLAR TABLA Users (10 usuarios)
INSERT INTO public."Users" (id, dni, password, "firstName", "lastName", email, "phoneNumber", "createdAt", "updatedAt")
VALUES
(1, '12345678A', 'hash1', 'Jon', 'Snow', 'jon@wall.com', '600000001', NOW(), NOW()),
(2, '23456789B', 'hash2', 'Daenerys', 'Targaryen', 'khaleesi@dragons.com', '600000002', NOW(), NOW()),
(3, '34567890C', 'hash3', 'Tyrion', 'Lannister', 'tyrion@casterly.com', '600000003', NOW(), NOW()),
(4, '45678901D', 'hash4', 'Arya', 'Stark', 'noone@braavos.com', '600000004', NOW(), NOW()),
(5, '56789012E', 'hash5', 'Sansa', 'Stark', 'sansa@winterfell.com', '600000005', NOW(), NOW()),
(6, '67890123F', 'hash6', 'Jaime', 'Lannister', 'jaime@kingslanding.com', '600000006', NOW(), NOW()),
(7, '78901234G', 'hash7', 'Cersei', 'Lannister', 'cersei@ironthrone.com', '600000007', NOW(), NOW()),
(8, '89012345H', 'hash8', 'Samwell', 'Tarly', 'sam@citadel.com', '600000008', NOW(), NOW()),
(9, '90123456I', 'hash9', 'Brienne', 'Tarth', 'brienne@tarth.com', '600000009', NOW(), NOW()),
(10, '01234567J', 'hash10', 'Jorah', 'Mormont', 'jorah@friendzone.com', '600000010', NOW(), NOW());

-- 2. POBLAR TABLA Accounts (Múltiples cuentas por usuario)
INSERT INTO public."Accounts" (id, "userId", "accountNumber", balance, "createdAt", "updatedAt")
VALUES
(1, 1, 'ES010001', 1500.50, NOW(), NOW()), -- Cuenta 1 Jon
(2, 1, 'ES010002', 500.00, NOW(), NOW()),  -- Cuenta 2 Jon
(3, 2, 'ES020001', 10000.00, NOW(), NOW()),-- Daenerys
(4, 3, 'ES030001', 2500.00, NOW(), NOW()), -- Tyrion
(5, 3, 'ES030002', 300.00, NOW(), NOW()),  -- Cuenta Ahorro Tyrion
(6, 4, 'ES040001', 120.00, NOW(), NOW()),  -- Arya
(7, 5, 'ES050001', 4000.00, NOW(), NOW()), -- Sansa
(8, 6, 'ES060001', 2000.00, NOW(), NOW()), -- Jaime
(9, 7, 'ES070001', 50000.00, NOW(), NOW()),-- Cersei
(10, 8, 'ES080001', 800.00, NOW(), NOW()), -- Samwell
(11, 9, 'ES090001', 1500.00, NOW(), NOW()),-- Brienne
(12, 10, 'ES100001', 450.00, NOW(), NOW());-- Jorah

-- 3. POBLAR TABLA Transactions
-- Nota: "accountId" suele referirse a la cuenta dueña del registro del extracto.
-- "sender" y "receiver" indican el flujo del dinero.
INSERT INTO public."Transactions" ("accountId", "senderAccountId", "receiverAccountId", amount, type, "createdAt", "updatedAt")
VALUES
(1, 1, 3, 100.00, 'TRANSFER', NOW(), NOW()), -- Jon envía a Daenerys
(3, 1, 3, 100.00, 'TRANSFER', NOW(), NOW()), -- Registro para Daenerys de la misma trans
(1, 1, 2, 50.00, 'INTERNAL', NOW(), NOW()),  -- Jon mueve entre sus cuentas (1 a 2)
(2, 1, 2, 50.00, 'INTERNAL', NOW(), NOW()),
(4, 4, 1, 1000.00, 'TRANSFER', NOW(), NOW()),-- Tyrion paga a Jon
(9, 9, 8, 500.00, 'TRANSFER', NOW(), NOW()), -- Cersei paga a Jaime
(12, 12, 3, 20.00, 'TRANSFER', NOW(), NOW()),-- Jorah a Daenerys
(7, 7, 6, 200.00, 'TRANSFER', NOW(), NOW()), -- Sansa a Arya
(5, 5, 4, 150.00, 'INTERNAL', NOW(), NOW()), -- Tyrion mueve cuenta 2 a cuenta 1
(10, 10, 11, 5.00, 'TRANSFER', NOW(), NOW());-- Samwell a Brienne

-- Ajustar los generadores de secuencias (serial) para que los próximos inserts manuales no fallen
SELECT setval(pg_get_serial_sequence('public."Users"', 'id'), (SELECT MAX(id) FROM public."Users"));
SELECT setval(pg_get_serial_sequence('public."Accounts"', 'id'), (SELECT MAX(id) FROM public."Accounts"));
SELECT setval(pg_get_serial_sequence('public."Transactions"', 'id'), (SELECT MAX(id) FROM public."Transactions"));

COMMIT;