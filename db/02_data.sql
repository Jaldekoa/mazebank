BEGIN;

-- 1. POBLAR TABLA Users (Se mantiene igual)
INSERT INTO public."Users" (id, dni, password, "firstName", "lastName", email, "phoneNumber", "createdAt", "updatedAt")
VALUES
(1, '12345678A', '$2b$10$zYI5JSGl3o7ecHWatUwFSe5c5xNkCVHhmYiC8RIl3ZCLgs1EFYiXa', 'Jon', 'Snow', 'jon@wall.com', '600000001', NOW(), NOW()),
(2, '23456789B', '$2b$10$zYI5JSGl3o7ecHWatUwFSe5c5xNkCVHhmYiC8RIl3ZCLgs1EFYiXa', 'Daenerys', 'Targaryen', 'khaleesi@dragons.com', '600000002', NOW(), NOW()),
(3, '34567890C', '$2b$10$zYI5JSGl3o7ecHWatUwFSe5c5xNkCVHhmYiC8RIl3ZCLgs1EFYiXa', 'Tyrion', 'Lannister', 'tyrion@casterly.com', '600000003', NOW(), NOW()),
(4, '45678901D', '$2b$10$zYI5JSGl3o7ecHWatUwFSe5c5xNkCVHhmYiC8RIl3ZCLgs1EFYiXa', 'Arya', 'Stark', 'noone@braavos.com', '600000004', NOW(), NOW()),
(5, '56789012E', '$2b$10$zYI5JSGl3o7ecHWatUwFSe5c5xNkCVHhmYiC8RIl3ZCLgs1EFYiXa', 'Sansa', 'Stark', 'sansa@winterfell.com', '600000005', NOW(), NOW()),
(6, '67890123F', '$2b$10$zYI5JSGl3o7ecHWatUwFSe5c5xNkCVHhmYiC8RIl3ZCLgs1EFYiXa', 'Jaime', 'Lannister', 'jaime@kingslanding.com', '600000006', NOW(), NOW()),
(7, '78901234G', '$2b$10$zYI5JSGl3o7ecHWatUwFSe5c5xNkCVHhmYiC8RIl3ZCLgs1EFYiXa', 'Cersei', 'Lannister', 'cersei@ironthrone.com', '600000007', NOW(), NOW()),
(8, '89012345H', '$2b$10$zYI5JSGl3o7ecHWatUwFSe5c5xNkCVHhmYiC8RIl3ZCLgs1EFYiXa', 'Samwell', 'Tarly', 'sam@citadel.com', '600000008', NOW(), NOW()),
(9, '90123456I', '$2b$10$zYI5JSGl3o7ecHWatUwFSe5c5xNkCVHhmYiC8RIl3ZCLgs1EFYiXa', 'Brienne', 'Tarth', 'brienne@tarth.com', '600000009', NOW(), NOW()),
(10, '01234567J', '$2b$10$zYI5JSGl3o7ecHWatUwFSe5c5xNkCVHhmYiC8RIl3ZCLgs1EFYiXa', 'Jorah', 'Mormont', 'jorah@friendzone.com', '600000010', NOW(), NOW()),
(11, '11223344K', '$2b$10$zYI5JSGl3o7ecHWatUwFSe5c5xNkCVHhmYiC8RIl3ZCLgs1EFYiXa', 'Theon', 'Greyjoy', 'theon@ironislands.com', '600000011', NOW(), NOW()),
(12, '22334455L', '$2b$10$zYI5JSGl3o7ecHWatUwFSe5c5xNkCVHhmYiC8RIl3ZCLgs1EFYiXa', 'Margaery', 'Tyrell', 'margaery@highgarden.com', '600000012', NOW(), NOW()),
(13, '33445566M', '$2b$10$zYI5JSGl3o7ecHWatUwFSe5c5xNkCVHhmYiC8RIl3ZCLgs1EFYiXa', 'Davos', 'Seaworth', 'davos@onion.com', '600000013', NOW(), NOW()),
(14, '44556677N', '$2b$10$zYI5JSGl3o7ecHWatUwFSe5c5xNkCVHhmYiC8RIl3ZCLgs1EFYiXa', 'Petyr', 'Baelish', 'littlefinger@eyrie.com', '600000014', NOW(), NOW()),
(15, '55667788O', '$2b$10$zYI5JSGl3o7ecHWatUwFSe5c5xNkCVHhmYiC8RIl3ZCLgs1EFYiXa', 'Varys', 'TheSpider', 'spider@whispers.com', '600000015', NOW(), NOW()),
(16, '66778899P', '$2b$10$zYI5JSGl3o7ecHWatUwFSe5c5xNkCVHhmYiC8RIl3ZCLgs1EFYiXa', 'Tormund', 'Giantsbane', 'tormund@beyondwall.com', '600000016', NOW(), NOW()),
(17, '77889900Q', '$2b$10$zYI5JSGl3o7ecHWatUwFSe5c5xNkCVHhmYiC8RIl3ZCLgs1EFYiXa', 'Gendry', 'Baratheon', 'gendry@bastard.com', '600000017', NOW(), NOW()),
(18, '88990011R', '$2b$10$zYI5JSGl3o7ecHWatUwFSe5c5xNkCVHhmYiC8RIl3ZCLgs1EFYiXa', 'Bronn', 'Blackwater', 'bronn@sellsword.com', '600000018', NOW(), NOW()),
(19, '99001122S', '$2b$10$zYI5JSGl3o7ecHWatUwFSe5c5xNkCVHhmYiC8RIl3ZCLgs1EFYiXa', 'Sandor', 'Clegane', 'hound@chicken.com', '600000019', NOW(), NOW()),
(20, '00112233T', '$2b$10$zYI5JSGl3o7ecHWatUwFSe5c5xNkCVHhmYiC8RIl3ZCLgs1EFYiXa', 'Ramsay', 'Bolton', 'ramsay@dreadfort.com', '600000020', NOW(), NOW());

-- 2. POBLAR TABLA Accounts (Con accountName)
INSERT INTO public."Accounts" (id, "userId", "accountName", "accountNumber", balance, "createdAt", "updatedAt")
VALUES
(1, 1, 'Cuenta Corriente', 'ES000001', 1500.50, NOW(), NOW()),
(2, 1, 'Ahorros Invernales', 'ES000002', 500.00, NOW(), NOW()),
(3, 2, 'Tesoro Real', 'ES000003', 10000.00, NOW(), NOW()),
(4, 3, 'Gastos de Mano', 'ES000004', 2500.00, NOW(), NOW()),
(5, 3, 'Reserva Casterly', 'ES000005', 300.00, NOW(), NOW()),
(6, 4, 'Fondo de Viaje', 'ES000006', 120.00, NOW(), NOW()),
(7, 5, 'Nómina Invernalia', 'ES000007', 4000.00, NOW(), NOW()),
(8, 6, 'Guardia Real Fund', 'ES000008', 2000.00, NOW(), NOW()),
(9, 7, 'Crédito de Hierro', 'ES000009', 50000.00, NOW(), NOW()),
(10, 8, 'Biblioteca Beca', 'ES000010', 800.00, NOW(), NOW()),
(11, 9, 'Fondo de Armadura', 'ES000011', 1500.00, NOW(), NOW()),
(12, 10, 'Fondo de Lealtad', 'ES000012', 450.00, NOW(), NOW()),
(13, 11, 'Cuenta Islas', 'ES000013', 50.00, NOW(), NOW()),
(14, 12, 'Fondos Highgarden', 'ES000014', 15000.00, NOW(), NOW()),
(15, 12, 'Ahorros Flores', 'ES000015', 25000.00, NOW(), NOW()),
(16, 13, 'Fondo de Contrabando', 'ES000016', 1200.00, NOW(), NOW()),
(17, 14, 'Inversiones Dedo', 'ES000017', 8000.00, NOW(), NOW()),
(18, 15, 'Red de Pajaritos', 'ES000018', 9500.00, NOW(), NOW()),
(19, 16, 'Fondo Leche Gigante', 'ES000019', 10.00, NOW(), NOW()),
(20, 17, 'Nómina Herrería', 'ES000020', 3000.00, NOW(), NOW()),
(21, 18, 'Fondo Mercenario', 'ES000021', 4500.00, NOW(), NOW()),
(22, 19, 'Fondo de Pollos', 'ES000022', 200.00, NOW(), NOW()),
(23, 20, 'Fondo de Caza', 'ES000023', 6000.00, NOW(), NOW()),
(24, 14, 'Caja B Meñique', 'ES000024', 45000.00, NOW(), NOW());

-- 3. POBLAR TABLA Transactions (Ampliada con más datos)
INSERT INTO public."Transactions" ("senderAccountId", "receiverAccountId", amount, details, type, "createdAt", "updatedAt")
VALUES
-- === DEPÓSITOS (Ingresos de dinero) ===
(NULL, 1, 1000.00, 'Ingreso nómina Guardia de la Noche', 'DEPOSIT', NOW() - INTERVAL '30 days', NOW()),
(NULL, 3, 5000.00, 'Subvención por dragones', 'DEPOSIT', NOW() - INTERVAL '28 days', NOW()),
(NULL, 9, 25000.00, 'Impuestos de Desembarco', 'DEPOSIT', NOW() - INTERVAL '25 days', NOW()),
(NULL, 14, 5000.00, 'Inversión inicial Burdel', 'DEPOSIT', NOW() - INTERVAL '20 days', NOW()),
(NULL, 21, 1000.00, 'Pago por servicios de escolta', 'DEPOSIT', NOW() - INTERVAL '15 days', NOW()),
(NULL, 7, 3500.00, 'Rentas de tierras del Norte', 'DEPOSIT', NOW() - INTERVAL '10 days', NOW()),
(NULL, 17, 12000.00, 'Beneficios de inversiones en Braavos', 'DEPOSIT', NOW() - INTERVAL '5 days', NOW()),
(NULL, 20, 1500.00, 'Venta de armas de herrería', 'DEPOSIT', NOW() - INTERVAL '2 days', NOW()),
(NULL, 4, 3000.00, 'Cobro de recompensa', 'DEPOSIT', NOW() - INTERVAL '1 day', NOW()),
(NULL, 15, 45000.00, 'Herencia de la Casa Tyrell', 'DEPOSIT', NOW(), NOW()),

-- === RETIROS (Gastos directos / Cajero) ===
(1, NULL, 50.00, 'Cajero automático El Muro', 'WITHDRAWAL', NOW() - INTERVAL '29 days', NOW()),
(4, NULL, 100.00, 'Cena en La Posada de la Encrucijada', 'WITHDRAWAL', NOW() - INTERVAL '27 days', NOW()),
(7, NULL, 200.00, 'Compras en el mercado de Invernalia', 'WITHDRAWAL', NOW() - INTERVAL '24 days', NOW()),
(23, NULL, 500.00, 'Gasto en suministros de tortura', 'WITHDRAWAL', NOW() - INTERVAL '22 days', NOW()),
(13, NULL, 20.00, 'Retirada para barcos', 'WITHDRAWAL', NOW() - INTERVAL '20 days', NOW()),
(18, NULL, 1500.00, 'Pago a red de informantes', 'WITHDRAWAL', NOW() - INTERVAL '18 days', NOW()),
(9, NULL, 12000.00, 'Compra de vino de Dorne', 'WITHDRAWAL', NOW() - INTERVAL '15 days', NOW()),
(21, NULL, 300.00, 'Noche en la taberna', 'WITHDRAWAL', NOW() - INTERVAL '10 days', NOW()),
(14, NULL, 2500.00, 'Mantenimiento de propiedades', 'WITHDRAWAL', NOW() - INTERVAL '5 days', NOW()),
(19, NULL, 5.00, 'Compra de un pollo asado', 'WITHDRAWAL', NOW() - INTERVAL '1 day', NOW()),

-- === TRANSFERENCIAS ENTRE PERSONAJES ===
(1, 3, 100.00, 'Regalo de boda', 'TRANSFER', NOW() - INTERVAL '28 days', NOW()),
(4, 1, 1000.00, 'Pago de deuda pendiente', 'TRANSFER', NOW() - INTERVAL '27 days', NOW()),
(9, 8, 500.00, 'Donación a la Ciudadela', 'TRANSFER', NOW() - INTERVAL '26 days', NOW()),
(12, 3, 20.00, 'Préstamo pequeño', 'TRANSFER', NOW() - INTERVAL '25 days', NOW()),
(7, 6, 200.00, 'Pago curso de esgrima', 'TRANSFER', NOW() - INTERVAL '24 days', NOW()),
(10, 11, 5.00, 'Propina caballeresca', 'TRANSFER', NOW() - INTERVAL '23 days', NOW()),
(14, 18, 2000.00, 'Pago por información secreta', 'TRANSFER', NOW() - INTERVAL '22 days', NOW()),
(15, 14, 10000.00, 'Acuerdo matrimonial Tyrell-Baelish', 'TRANSFER', NOW() - INTERVAL '21 days', NOW()),
(21, 19, 150.00, 'Pago apuesta de pelea', 'TRANSFER', NOW() - INTERVAL '20 days', NOW()),
(20, 11, 100.00, 'Donación para reconstrucción', 'TRANSFER', NOW() - INTERVAL '19 days', NOW()),
(3, 15, 2500.00, 'Subvención para flota naval', 'TRANSFER', NOW() - INTERVAL '18 days', NOW()),
(9, 21, 3000.00, 'Pago a mercenarios por protección', 'TRANSFER', NOW() - INTERVAL '17 days', NOW()),
(8, 9, 100.00, 'Intereses préstamo real', 'TRANSFER', NOW() - INTERVAL '16 days', NOW()),
(17, 18, 450.00, 'Suscripción mensual a rumores', 'TRANSFER', NOW() - INTERVAL '15 days', NOW()),
(24, 17, 3000.00, 'Lavado de capitales (Caja B)', 'TRANSFER', NOW() - INTERVAL '14 days', NOW()),
(2, 7, 500.00, 'Ayuda humanitaria Muro', 'TRANSFER', NOW() - INTERVAL '13 days', NOW()),
(6, 4, 120.00, 'Devolución de fianza', 'TRANSFER', NOW() - INTERVAL '12 days', NOW()),
(21, 22, 10.00, 'Propina para el Perro', 'TRANSFER', NOW() - INTERVAL '11 days', NOW()),
(14, 9, 5000.00, 'Soborno para el Consejo Real', 'TRANSFER', NOW() - INTERVAL '10 days', NOW()),
(3, 12, 1500.00, 'Suministros para Essos', 'TRANSFER', NOW() - INTERVAL '9 days', NOW()),

-- === TRANSFERENCIAS PROPIAS (INTER-CUENTAS) ===
(1, 2, 50.00, 'Traspaso a cuenta de ahorro', 'TRANSFER', NOW() - INTERVAL '8 days', NOW()),
(4, 5, 150.00, 'Ahorro mensual', 'TRANSFER', NOW() - INTERVAL '7 days', NOW()),
(14, 24, 2000.00, 'Desvío a cuenta B', 'TRANSFER', NOW() - INTERVAL '6 days', NOW()),
(3, 4, 1000.00, 'Traspaso para gastos de viaje', 'TRANSFER', NOW() - INTERVAL '5 days', NOW()),
(15, 14, 5000.00, 'Reajuste de cartera Highgarden', 'TRANSFER', NOW() - INTERVAL '4 days', NOW()),
(17, 24, 500.00, 'Mover fondos a cuenta secundaria', 'TRANSFER', NOW() - INTERVAL '3 days', NOW());

-- Transferencias variadas
(14, 18, 2000.00, 'Pago por información secreta', 'TRANSFER', NOW(), NOW()),
(15, 14, 10000.00, 'Acuerdo matrimonial Tyrell-Baelish', 'TRANSFER', NOW(), NOW()),
(17, 24, 500.00, 'Mover fondos a cuenta secundaria', 'TRANSFER', NOW(), NOW()),
(21, 19, 150.00, 'Pago apuesta de pelea', 'TRANSFER', NOW(), NOW()),
(20, 11, 100.00, 'Donación para reconstrucción', 'TRANSFER', NOW(), NOW()),
(3, 15, 2500.00, 'Subvención para flota naval', 'TRANSFER', NOW(), NOW()),
(9, 21, 3000.00, 'Pago a mercenarios por protección', 'TRANSFER', NOW(), NOW()),
(8, 9, 100.00, 'Intereses préstamo real', 'TRANSFER', NOW(), NOW());

-- 4. Ajustar generadores de secuencias
SELECT setval(pg_get_serial_sequence('public."Users"', 'id'), (SELECT MAX(id) FROM public."Users"));
SELECT setval(pg_get_serial_sequence('public."Accounts"', 'id'), (SELECT MAX(id) FROM public."Accounts"));
SELECT setval(pg_get_serial_sequence('public."Transactions"', 'id'), (SELECT MAX(id) FROM public."Transactions"));

COMMIT;