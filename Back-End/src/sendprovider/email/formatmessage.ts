import {ConfigService} from "@nestjs/config";
import {Injectable} from "@nestjs/common";

@Injectable()
export class Formatmessage {
    constructor(
        private configService: ConfigService
    ) {
    }

    Signature() {
        return `<br/><div>
    <span class="colour" style="color:#999999">
        ------------
    </span>
</div>
<div>
    <span class="colour" style="color:rgb(153, 153, 153)">
        <b>
            Thank You
            <br>
        </b>
    </span>
</div>
<div>
    <span class="colour" style="color:rgb(153, 153, 153)">
        <b>
            Best Regards
        </b>
    </span>
    <span class="colour" style="color:rgb(204, 204, 204)">
        <b>
            <br>
        </b>
    </span>
</div>
<div>
    <b>
        <br>
    </b>
</div>
<div>
    <span class="colour" style="color:rgb(0, 0, 255)">
        <b>
            Technical Team
        </b>
    </span>
    <b>
        <br>
    </b>
</div>
<div>
    <b>
    ${this.configService.get<string>('env') === 'shop2pay' ? 'Shop <span class="colour" style="color:rgb(255, 153, 51)">2</span>pay' : this.configService.get<string>('env') === 'fundpay' ? 'FundPay' : ''}
    </b>
    <br>
</div>
<div>
    <img style="" height="150" width="150" src="${this.configService.get('baseURL')}/images/logo/logo.png">
    <br>
</div>
`
    }
}
