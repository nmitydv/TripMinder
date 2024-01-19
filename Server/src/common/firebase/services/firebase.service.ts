import { Injectable, NotFoundException } from '@nestjs/common'
import * as firebaseAdmin from 'firebase-admin'
import { ConfigService } from '@nestjs/config'
import { MulticastMessage, NotificationMessagePayload } from 'firebase-admin/lib/messaging/messaging-api'
import { UserService } from 'src/modules/user/services/user.service'
import { UserDoc } from 'src/modules/user/repository/entities/user.entity'
import { UserRepository } from 'src/modules/user/repository/repositories/user.repository'
import { BookingNotification } from '../constants/notification-constants'

@Injectable()
export class FirebaseService {
    constructor(private readonly configService: ConfigService,
        private readonly userService: UserService,
        // private readonly userRepository: UserRepository,

        ) {
        const firebaseDatabaseURL = this.configService.get<string>('firebase.firebaseDatabaseURL')
        const firebaseStorageBucket = this.configService.get<string>('firebase.firebaseStorageBucket')

        if (!firebaseAdmin.apps.length) {
            console.log('FirebaseService: Firebase admin is not initialized yet. Initializing now...')
            firebaseAdmin.initializeApp({
                credential: firebaseAdmin.credential.cert(this.configService.get<any>('firebase.firebase')),
                databaseURL: firebaseDatabaseURL,
                storageBucket: firebaseStorageBucket,
            })
        }
    }
    async Firestore(): Promise<firebaseAdmin.firestore.Firestore> {
        return firebaseAdmin.firestore()
    }

    async Storage(): Promise<firebaseAdmin.storage.Storage> {
        return firebaseAdmin.storage()
    }

    async GetFirebaseAdmin(): Promise<typeof firebaseAdmin> {
        return firebaseAdmin;
    }

    /**
     * Update custom claims in firebase without overwriting all existing claims.
     * @param userId: string
     * @param upsertCustomClaims: Record<string, any>
     */
    async UpsertCustomClaims(userId: string, upsertCustomClaims: Record<string, any>): Promise<void> {
        const firebaseUser = await firebaseAdmin.auth().getUser(userId)
        const existingCustomClaims = firebaseUser.customClaims

        // Merge upsertCustomClaims in to existingCustomClaims.
        const newCustomClaims = Object.assign({}, existingCustomClaims, upsertCustomClaims)

        // Overwrite firebase custom claims with newCustomClaims.
        await firebaseAdmin.auth().setCustomUserClaims(userId, newCustomClaims)
    }

    /**
     * Delete custom claims in firebase without overwriting all existing claims.
     * @param userId: string
     * @param deleteCustomClaimKeys: Array<string>
     */
    async DeleteCustomClaims(userId: string, deleteCustomClaimKeys: Array<string>): Promise<void> {
        const firebaseUser = await firebaseAdmin.auth().getUser(userId)
        const existingCustomClaims = firebaseUser.customClaims

        for (const customClaimKey of deleteCustomClaimKeys) {
            delete existingCustomClaims[customClaimKey]
        }

        // Create newCustomClaims from existingCustomClaims for more readability.
        const newCustomClaims = Object.assign({}, existingCustomClaims)

        // Overwrite firebase custom claims with newCustomClaims.
        await firebaseAdmin.auth().setCustomUserClaims(userId, newCustomClaims)
    }

    /**
     * Delete user in firebase auth.
     * @param userId: string
     */
    async DeleteFirebaseUser(userId: string,): Promise<void> {
        await firebaseAdmin.auth().deleteUser(userId)
    }

    async sendPushNotification(userIds: string[],template?:NotificationMessagePayload): Promise<void> {
        try {
            const user = this.userService.findAll({_id : { $in : userIds}});

        // const allNotificationTokens: string[] = (await user).notificationTokens || [];
        
        const pipeline = [
            {
                $match: {
                    _id: { $in: userIds },
                },
            },
            {
                $group: {
                    _id: null,
                    notificationTokens: { $push: '$notificationTokens' },
                },
            },
        ];

        const result: { _id: null; notificationTokens: string[][] }[] = await this.userService.rawPipeline(
            pipeline
        )
        console.log(JSON.stringify(result) + ' result ---------');
        // const result = await this.userRepository.raw(pipeline);

            if (result.length === 0 || !result[0].notificationTokens) {
                throw new NotFoundException('No users found with the provided IDs');
            }

            const allNotificationTokens: string[] = result[0].notificationTokens.flat();


         console.log(allNotificationTokens+"  alll tokensssss--------")
         const messaging = await firebaseAdmin.messaging();
         
         // const startDate = "2023-12-20",endDate= "2023-12-21",pickupLocation="khategaon",droplocation="indore";
         
            // const  customeNotification = {
            //     ...BookingNotification.confirmation,
            //     body: BookingNotification.confirmation.body
            //          .replace('[pickupLocation]', pickupLocation)
            //         .replace('[dropLocation]', droplocation)
            //         .replace('[startDate]', startDate)
            //         .replace('[endDate]', endDate),
            // };
            if(allNotificationTokens && allNotificationTokens.length ){
                console.log("come into the block");               
            await messaging.sendEachForMulticast({
                tokens:  allNotificationTokens,
                notification: template
            });

        }

            console.log("send notificationss to all users")
            // await messaging.send({
            //     token:  "e7gie2TCTf9qPpoiNEtSCu:APA91bGIUYN6ufSP7Z5KYPgfalV9CWV66u-1CuQZ1azCo947zf-qOZ0-cbtFRfr45nyEdScWoZa8XVveQS2FW59WGd0mkGEYyIVDF03oudFJeFoPBbiOpiKWmOprpovxqiriA6pdXeoy",
            //     notification: {
            //         title: 'Test',
            //         body: 'This is a test message from Nest.js',
            //     },
            // });
        } catch (error) {
            console.error('Error:', error.response?.data || error.message || error);
            throw new Error('Internal Server Error');
        }
    }

    async sendWhatsAppMessage(userId: string, message : string): Promise<void> {
        
        const token = process.env.WATTSAPP_MESSAGE_TOKEN;
        const user = await this.userService.findOne<UserDoc>({_id : userId});
        const mobileNumber = user.mobileNumber;
        console.log("enter wattsapp message---------===")
        console.log(mobileNumber +"  : token  wattsapp message---------===")
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append(
          'Authorization',
          'Bearer '+token,
        );
        console.log("enter wattsapp message      raw=========--------")
        const raw = JSON.stringify({
          messaging_product: 'whatsapp',
          to: '91'+mobileNumber,
          type: 'template',
          template: {
            name: 'apna_yatri2',
            language: {
              code: 'en_US',
            },
            components: [
              {
                type: 'body',
                parameters: [
                  {
                    type: 'text',
                    text: message,
                  },
                ],
              },
            ],
          },
        });
    
        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
        //   redirect: 'follow',
        };
    
        try {
            console.log("enter wattsapp message call api------==========")
          const response = await fetch('https://graph.facebook.com/v17.0/182190434984243/messages', requestOptions);
          const result = await response.json();
          console.log(result);
        } catch (error) {
          console.error('Error:', error);
        }
      }

}