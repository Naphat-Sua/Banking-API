import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Accountbank} from '../entities/Accountbank';
import {Repository} from 'typeorm';
import {Admin} from '../entities/Admin';
import {Autosms} from '../entities/Autosms';
import {Customer} from '../entities/Customer';
import {Deposit} from '../entities/Deposit';
import {Logsorder} from '../entities/Logsorder';
import {Manager} from '../entities/Manager';
import {Operation} from '../entities/Operation';
import {Settlement} from '../entities/Settlement';
import {Typebank} from '../entities/Typebank';
import {Webhook} from '../entities/Webhook';
import {Withdraw} from '../entities/Withdraw';
import {Allnotification} from '../entities/Allnotification';
import {Notification} from '../entities/Notification';
import {TypeNotification} from '../entities/TypeNotification';
import {TotalCustomerBanktransfer} from '../entities/TotalCustomerBanktransfer';
import {TotalKsher} from '../entities/TotalKsher';
import {Agent} from '../entities/Agent';
import {CryptoWallet} from '../entities/CryptoWallet';
import {MdrDeposit} from '../entities/MdrDeposit';
import {MdrWithdraw} from '../entities/MdrWithdraw';
import {MdrFeeSettlement} from '../entities/MdrFeeSettlement';
import {MutiAccount} from '../entities/MutiAccount';
import {Order} from '../entities/Order';
import {Merchant} from '../entities/Merchant';
import {MerchantPiPay} from '../entities/MerchantPiPay';
import {DirepayTransaction} from '../entities/DirepayTransaction';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(Accountbank)
    public accountbankRepository: Repository<Accountbank>,
    @InjectRepository(Admin)
    public adminRepository: Repository<Admin>,
    @InjectRepository(Autosms)
    public autosmsRepository: Repository<Autosms>,
    @InjectRepository(Customer)
    public customerRepository: Repository<Customer>,
    @InjectRepository(Deposit)
    public depositRepository: Repository<Deposit>,
    @InjectRepository(Logsorder)
    public logsorderRepository: Repository<Logsorder>,
    @InjectRepository(Manager)
    public managerRepository: Repository<Manager>,
    @InjectRepository(Operation)
    public operationRepository: Repository<Operation>,
    @InjectRepository(Settlement)
    public settlementRepository: Repository<Settlement>,
    @InjectRepository(Typebank)
    public typebankRepository: Repository<Typebank>,
    @InjectRepository(Webhook)
    public webhookRepository: Repository<Webhook>,
    @InjectRepository(Withdraw)
    public withdrawRepository: Repository<Withdraw>,
    @InjectRepository(Allnotification)
    public allnotificationRepository: Repository<Allnotification>,
    @InjectRepository(Notification)
    public notifiationRepository: Repository<Notification>,
    @InjectRepository(TypeNotification)
    public typeNotificationRepository: Repository<TypeNotification>,
    @InjectRepository(TotalCustomerBanktransfer)
    public totalCustomerBanktransfer: Repository<TotalCustomerBanktransfer>,
    @InjectRepository(TotalKsher)
    public totalKsherRepository: Repository<TotalKsher>,
    @InjectRepository(Agent)
    public agentRepository: Repository<Agent>,
    @InjectRepository(CryptoWallet)
    public cryptoWalletRepository: Repository<CryptoWallet>,
    @InjectRepository(MdrDeposit)
    public mdrDepositRepository: Repository<MdrDeposit>,
    @InjectRepository(MdrWithdraw)
    public mdrWithdrawRepository: Repository<MdrWithdraw>,
    @InjectRepository(MdrFeeSettlement)
    public mdrFeeSettlementRepository: Repository<MdrFeeSettlement>,
    @InjectRepository(MutiAccount)
    public mutiAccountRepository: Repository<MutiAccount>,
    @InjectRepository(Order)
    public orderRespository: Repository<Order>,
    @InjectRepository(Merchant)
    public merchantRespository: Repository<Merchant>,
    @InjectRepository(MerchantPiPay)
    public merchantPiPayRespository: Repository<MerchantPiPay>,
    @InjectRepository(DirepayTransaction)
    public direpayTransactionRepository: Repository<DirepayTransaction>
  ) {
  }
}
