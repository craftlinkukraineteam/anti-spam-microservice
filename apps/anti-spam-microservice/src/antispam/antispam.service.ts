import { Injectable } from '@nestjs/common';


@Injectable()
export class AntispamService {
    private forbiddenWordsForEnter = ['buy now', 'free money', 'click here', 'link here', 'open here', 'find out here'];
    private maxLengthOfMsg = 500;

    checkMessage(message: String): {
        isSpam: boolean;
        reasons: string[]
    } {
        const reasons: string[] = [];

        // Здійснюємо перевірку повідомлень на кількість посилань, яку вони містять
        const links = (message.match(/https?:\/\//g) || []).length;
        if (links > 2) {
            const tooManyLinksWarnMsg: string = 'Too many links !';
            reasons.push(tooManyLinksWarnMsg);
        }

        // Здійснюємо перевірку на наявність заборонених слів у повідомленнях
        const forbiddenContainsWarnMsg: string = 'Contains forbidden words:';
        this.forbiddenWordsForEnter.forEach(word => {
            if (message.toLowerCase().includes(word)) {
                reasons.push(`${forbiddenContainsWarnMsg} "${word}"`);
            }
        });

        // Здійснюємо перевірку повідомлень на наявність слів, що дублюються
        const inputWords: string[] = message.toLowerCase().split(/\s+/);
        const duplicateWords: string[] = inputWords.filter((word, i) => word.indexOf(word) !== i);
        if (duplicateWords.length > 5) {
            const tooManyRepeatedWrnMsg = 'Too many repeated words !';
            reasons.push(tooManyRepeatedWrnMsg);
        }

        // Здійснюємо перевірку повідомлень на його довжину
        if (message.length > this.maxLengthOfMsg) {
            const maxLengthWrnMsg: string = 'Too long length of the message';
            reasons.push(`${maxLengthWrnMsg} (>${this.maxLengthOfMsg} character(s))`);
        }

        return {
            isSpam: reasons.length > 0, reasons
        }
    }
}
